import { NextResponse } from 'next/server';
import type { AiReport } from '@/modules/ai';

const fallbackReport: AiReport = {
  summary: '暂时无法连接 AI 服务。以下计算结果仍然有效，请稍后重试解读。',
  personality: '请把命理信息当作自我观察的参考，而不是固定标签。',
  career: '职业选择请结合实际经验、能力和环境逐步验证。',
  relationship: '关系中的沟通、尊重和边界比单一命理指标更重要。',
  wealth: '财务决定请结合预算、风险承受能力和专业建议。',
  timeline: '当前版本只提供基础盘，尚未计算完整时间周期。',
  supportingSignals: [],
  conflictingSignals: [],
  uncertainty: '命理不能确定地预测未来，也不能替代专业判断。',
  advice: '保留自己的判断，把报告当成提出问题和观察自己的起点。',
};

const systemPrompt = `你是 Destiny OS 的谨慎、温和的 AI 解读助手。你只能解释用户提供的已经计算完成的结构化数据，绝对不能自行计算或猜测四柱、干支、节气、农历、星体位置、宫位或相位。\n\n请用简体中文返回严格的 JSON 对象，字段必须是：summary、personality、career、relationship、wealth、timeline、supportingSignals、conflictingSignals、uncertainty、advice。summary 等文字字段应有实质内容，每个主题建议 2-4 句；supportingSignals 和 conflictingSignals 必须是字符串数组。\n\n不要使用“一定”“必然”“注定”等绝对化措辞，不要预测死亡、疾病、违法、投资收益或其他高风险结果。涉及健康、投资、法律、心理等问题时，提醒用户咨询合格专业人士。明确说明这是文化研究和自我观察参考。`;

function isAiReport(value: unknown): value is AiReport {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  const textFields = ['summary', 'personality', 'career', 'relationship', 'wealth', 'timeline', 'uncertainty', 'advice'];
  return textFields.every((field) => typeof record[field] === 'string')
    && Array.isArray(record.supportingSignals)
    && Array.isArray(record.conflictingSignals)
    && [...record.supportingSignals, ...record.conflictingSignals].every((item) => typeof item === 'string');
}

export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || !process.env.OPENAI_API_KEY) {
    return NextResponse.json(fallbackReport);
  }

  try {
    const body = await request.json();
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.5,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify({ question: body.question || '', profile: body.profile || {}, systems: body.systems || {}, ruleMatches: body.ruleMatches || [] }) },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('OpenAI request failed:', response.status, detail);
      return NextResponse.json({ ...fallbackReport, uncertainty: 'OpenAI 暂时不可用，当前显示的是安全备用文案。请检查 API key、账户余额和网络。' }, { status: 502 });
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;
    const parsed = typeof content === 'string' ? JSON.parse(content) : null;
    if (!isAiReport(parsed)) throw new Error('OpenAI returned an invalid report shape');
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Interpretation error:', error);
    return NextResponse.json({ ...fallbackReport, uncertainty: '解读服务出现暂时性问题，当前显示的是安全备用文案。' }, { status: 500 });
  }
}
