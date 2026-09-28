# AGENTS.md

## 开发原则

1. 计算和 AI 解释必须分离。AI 不得计算任何历法、四柱或天文数据。
2. 原始出生时间永远不可覆盖；任何时区、夏令时或真太阳时修正都必须保存为新字段。
3. 新术数必须实现 `DivinationSystem`，并能输出结构化事实。
4. 不做绝对化、高风险断言。健康、法律、投资问题必须提醒用户寻求专业意见。
5. 私密出生资料不能写入日志、前端 bundle 或 Git。

## 常用命令

- `npm run dev`：本地开发
- `npm run lint`：代码检查
- `npm run test`：自动化测试
- `npm run build`：生产构建

## 修改八字计算器

请先增加 `src/modules/bazi/tests` 测试，再修改 `calculator/index.ts`。历法引擎应通过适配器替换，不能把第三方库调用散落在页面中。
