# OpenAI 接入说明

## 1. 配置本地密钥

在项目根目录打开 `.env.local`：

```env
OPENAI_API_KEY=你的密钥
OPENAI_MODEL=gpt-4o-mini
NEXT_PUBLIC_USE_MOCKS=false
```

`OPENAI_API_KEY` 没有 `NEXT_PUBLIC_` 前缀，因此只会在 Next.js 服务端 API route 使用，不能放到前端代码中。不要把 `.env.local` 提交到 GitHub。

## 2. 启动

在项目目录运行：

```bat
npm run dev
```

浏览器打开 `http://localhost:3000`，填写出生资料并生成报告。报告页会把已经由程序计算好的八字 JSON 发送到 `/api/interpret`，服务器再调用 OpenAI。

## 3. 费用和失败处理

每次生成解读都会调用 OpenAI API，可能产生费用。当前默认模型是 `gpt-4o-mini`，可在 `.env.local` 修改。API 调用失败时页面显示安全备用文案，不会影响八字计算。

## 4. 安全规则

- 不要把 API key 粘贴到聊天、截图、前端变量或 GitHub。
- 如果 key 泄露，请立即在 OpenAI 控制台撤销并重新创建。
- AI 不能计算四柱、节气、农历、星体、宫位或相位，只能解释计算结果。
