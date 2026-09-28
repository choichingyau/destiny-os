'use client';
import { useEffect, useState } from 'react';
import { calculateBazi } from '@/modules/bazi/calculator';
import type { AiReport } from '@/modules/ai';
import type { BaziChart } from '@/modules/bazi/types';

export default function ReportPage() {
  const [chart, setChart] = useState<BaziChart | null>(null);
  const [ai, setAi] = useState<AiReport | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    const raw = sessionStorage.getItem('destiny.birth');
    if (!raw) return;
    const input = JSON.parse(raw);
    const bazi = calculateBazi({ date: input.birthDate, time: input.birthTime, unknownTime: Boolean(input.unknownTime) });
    setChart(bazi);
    setAiLoading(true);
    fetch('/api/interpret', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: input, systems: { bazi }, ruleMatches: [] }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.uncertainty || '解读服务暂时不可用');
        return data as AiReport;
      })
      .then(setAi)
      .catch((error: Error) => setAiError(error.message))
      .finally(() => setAiLoading(false));
  }, []);

  if (!chart) return <main className="p-10">请先从首页填写出生资料。</main>;
  return <main className="min-h-screen bg-sand px-6 py-12 text-ink"><div className="mx-auto max-w-5xl"><a href="/" className="text-sm text-jade">← 天机</a><h1 className="mt-8 text-4xl font-semibold">你的基础探索报告</h1><p className="mt-3 text-slate-600">计算引擎：{chart.engine} · 农历：{chart.lunarDate}</p><section className="mt-8 grid gap-5 md:grid-cols-4">{Object.entries(chart.pillars).map(([key,p])=><div key={key} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{key}柱</p><p className="mt-3 text-3xl font-semibold">{p ? `${p.stem}${p.branch}` : '未知'}</p><p className="mt-2 text-sm">{p ? `${p.stemElement} / ${p.branchElement} · ${p.yinYang}` : '未提供出生时间'}</p></div>)}</section><section className="mt-6 rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">五行基础统计</h2><div className="mt-5 flex flex-wrap gap-3">{Object.entries(chart.elementCounts).map(([k,v])=><span key={k} className="rounded-full bg-sand px-4 py-2">{k} {v}</span>)}</div></section><section className="mt-6 rounded-2xl bg-ink p-7 text-white"><p className="text-sm text-white/60">AI 综合解读{process.env.NEXT_PUBLIC_USE_MOCKS === 'true' ? '（Mock）' : ''}</p>{aiLoading && <p className="mt-4 text-white/70">正在根据已计算的八字数据生成解读，请稍候……</p>}{aiError && <p className="mt-4 text-amber-200">{aiError}</p>}{ai&&<><h2 className="mt-3 text-2xl">{ai.summary}</h2><div className="mt-6 grid gap-5 md:grid-cols-2">{[['性格',ai.personality],['事业',ai.career],['关系',ai.relationship],['财富',ai.wealth],['时间线',ai.timeline],['建议',ai.advice],['不确定性',ai.uncertainty]].map(([k,v])=><div key={k}><b>{k}</b><p className="mt-1 whitespace-pre-line text-white/70">{v}</p></div>)}</div><div className="mt-6 grid gap-5 md:grid-cols-2"><div><b>支持信号</b><ul className="mt-2 list-disc pl-5 text-white/70">{ai.supportingSignals.map((item) => <li key={item}>{item}</li>)}</ul></div><div><b>冲突或限制</b><ul className="mt-2 list-disc pl-5 text-white/70">{ai.conflictingSignals.map((item) => <li key={item}>{item}</li>)}</ul></div></div></>}</section><p className="mt-8 text-sm text-slate-500">这不是确定性预测，也不能替代医疗、法律、投资等专业判断。</p></div></main>;
}
