# 天机台 - Destiny Workbench

融合中国传统命理、西方占星以及 AI 的智能命理工作台。

**定位**：专业命理师的工作工具，不是消费者娱乐站。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务
npm run dev

# 打开浏览器
http://localhost:3000
```

## 技术栈决策

- **前端**：Next.js 14 + React + TypeScript + Tailwind CSS
- **数据库**：SQLite（本地开发）+ Prisma ORM（易于迁移）
- **API**：Next.js API Routes
- **AI**：DeepSeek API（已接入，兼容 OpenAI）
- **部署**：Vercel（生产环境）
- **认证**：简单会话管理（本阶段不做复杂权限）

## 项目结构

```
src/
├── app/                    # Next.js 应用
│   ├── page.tsx            # 首页
│   ├── dashboard/          # 工作台
│   │   ├── page.tsx
│   │   ├── client/         # 命主
│   │   │   ├── [id]/page.tsx
│   │   │   └── new/page.tsx
│   │   ├── session/        # 会话记录
│   │   │   └── [id]/page.tsx
│   │   └── event/          # 人生事件
│   │       ├── [id]/page.tsx
│   │       └── new/page.tsx
│   └── api/
│       ├── clients/        # 命主 CRUD
│       ├── sessions/       # 会话 CRUD
│       ├── events/         # 事件 CRUD
│       └── interpret/      # AI 解盘
├── lib/
│   ├── db.ts               # 数据库连接
│   ├── auth.ts             # 会话管理
│   ├── destiny.ts          # 命理计算（八字、西占）
│   └── ai.ts               # AI 接口封装
├── components/             # React 组件
│   ├── layout/
│   ├── forms/
│   ├── cards/
│   └── dialogs/
├── styles/                 # 全局样式
└── prisma/
    └── schema.prisma       # 数据库定义
```

## 核心功能（第一阶段）

### 1. 命主管理
- 新增命主（出生时间、地点、备注）
- 编辑命主资料
- 命主列表
- 命主详情页
- 版本管理（修改出生时间生成 Version 2）

### 2. 命盘展示
- 八字计算（四柱、十神、大运）
- 西方占星（太阳月亮上升、宫位、相位）
- 术数来源标注

### 3. 人生事件
- 记录重要事件（结婚、工作变化、搬迁等）
- 事件时间、描述、关键决策
- 事件与命盘对标

### 4. AI 解盘
- 输入问题（事业、感情、财运、时运等）
- AI 基于命主资料 + 事件 + 历史会话分析
- 输出必须标注依据和术数来源
- 保存会话记录

### 5. 历史与版本
- Session 永久保存
- Birth Profile 版本控制
- 修改出生时间后旧 Session 保留原版本数据
- 可回看所有历史咨询

## 产品原则

1. **信息清晰**：不浮夸承诺
2. **数据可靠**：事实与AI假设分离
3. **操作快速**：命理师工作流不超过3步
4. **历史可追踪**：所有变更都有版本记录
5. **AI判断有依据**：显示术数来源与推理过程

## 设计系统

色板：
- 暖白 #F5F2EA
- 墨黑 #171817
- 墨青 #18201F
- 朱砂 #9D4935
- 青灰 #657875
- 古铜 #A88956

风格：东方哲学感 + 现代专业软件 + 安静克制 + 高级

## 文案原则

禁止：最准、注定、必发财、必离婚、大凶、100%准确

优先：倾向、信号、阶段、目前更支持、可能表现、需要进一步确认

## 部署计划

- **开发阶段**：本地 SQLite + npm run dev
- **测试阶段**：云端 PostgreSQL + 测试服务器
- **上线阶段**：Vercel + PostgreSQL + 自定义域名

## 下一步

1. 初始化项目结构
2. 建立数据库 Schema（命主、会话、事件、版本）
3. 实现命主管理页面
4. 实现命盘计算与展示
5. 接入 DeepSeek AI
6. UI 美化与响应式适配
7. 测试完整用户流程
