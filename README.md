# Destiny OS

天机 / Destiny OS 是一个把确定性的历法与命理计算，和 AI 语言解释严格分开的智能命理平台 MVP。

## 当前 MVP

- Next.js + TypeScript + Tailwind CSS
- 出生资料输入与隐私友好的原始时间保存模型
- 使用 `lunar-typescript` 计算农历与基础四柱
- 八字结构化结果展示
- 西方占星统一数据结构（计算引擎暂为占位）
- 结构化 mock AI 解读
- Supabase 数据层接口与本地 mock 模式
- Cross Validation 和出生时辰校准接口占位
- Vitest 自动化测试

> 本项目仅供文化研究与娱乐参考，不能替代医疗、法律、投资、心理或其他专业意见。

## 本地运行

要求 Node.js 20+。

```bash
npm install
cp .env.example .env.local
npm run dev
```

打开 http://localhost:3000，点击“探索自己”即可填写出生资料。

```bash
npm run lint
npm run test
npm run build
```

没有 Supabase 或 OpenAI key 时，项目会自动使用 mock provider，不影响本地演示。

## 重要架构约束

```text
用户输入
→ Input Normalizer
→ 时间、时区、出生地点标准化
→ Calendar / Astronomy Engine
→ 各术数 Calculator
→ Rule Engine
→ Cross Validation Engine
→ AI Interpretation Engine
→ Report
```

计算模块只产生结构化事实；AI 只能读取事实，不能计算干支、节气、农历、星体位置、宫位或相位。

## 目录

- `src/modules/bazi`：八字类型、计算器、规则、格式化与测试
- `src/modules/astrology`：可扩展的占星数据结构
- `src/modules/divination`：统一术数插件接口
- `src/modules/ai`：结构化 AI 输出与 mock provider
- `src/modules/cross-validation`：跨体系主题交叉验证接口
- `src/modules/birth-time`：出生时辰校准占位接口
- `src/lib`：输入标准化、Supabase 与共享类型
- `src/app`：页面与 API route

## 数据库

`supabase/schema.sql` 提供 profiles、birth_profiles、charts、chart_results、readings、reports、life_events、birth_time_candidates、feedback 表，以及基于 `auth.uid()` 的 RLS 策略。执行前请在 Supabase 项目中启用 Auth。

## 第三方许可

本项目使用 `lunar-typescript` 作为可替换的中国历法计算适配器。请在发布前按照其当前仓库和 npm 包附带的许可证履行归属和合规义务，并在升级依赖时重新检查许可证。西方占星计算目前没有接入 Swiss Ephemeris；若未来接入，请单独评估其 AGPL-3.0 许可和部署影响。
