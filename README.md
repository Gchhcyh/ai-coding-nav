# AI Coding Nav

<p align="center">
  <h1 align="center">AI Coding Nav</h1>
  <p align="center">AI 编程工具全链路导航 —— 不是又一份工具清单，而是决策引擎</p>
</p>

<p align="center">
  <a href="https://ai-coding-nav.pages.dev"><img src="https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white" alt="Deploy"></a>
  <a href="#"><img src="https://img.shields.io/badge/Tools-84-blue" alt="Tools"></a>
  <a href="https://github.com/Gchhcyh/ai-coding-nav/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green" alt="License"></a>
  <a href="https://www.producthunt.com/products/ai-coding-nav"><img src="https://img.shields.io/badge/Product%20Hunt-Launched-orange?logo=producthunt" alt="Product Hunt"></a>
</p>

---

**线上地址**: [ai-coding-nav.pages.dev](https://ai-coding-nav.pages.dev)

## 产品定位

面向开发者的 AI 工具决策引擎。不做社区、不做 SaaS，核心价值就是**帮开发者 30 秒内找到合适的 AI 工具，并能真正对比出差异**。

## 截图

<p align="center">
  <img src="public/screenshots/homepage.png" alt="AI Coding Nav 首页" width="800">
</p>

## 功能亮点

| 功能 | 说明 |
|------|------|
| **对比模式** | 最多 4 个工具并排对比，优缺点、适用场景一目了然 |
| **场景推荐** | 回答几个问题，系统帮你匹配最适合的工具 |
| **实战笔记** | 每个工具的实测体验和对比评测，不加滤镜 |
| **更新日志** | 工具数据变动追踪，保持信息时效性 |
| **模糊搜索** | Fuse.js 客户端搜索，工具名/描述/标签秒搜 |

## 完整功能清单

| 功能 | 状态 | 说明 |
|------|------|------|
| 工具收录 | ✅ 84 个 | 6 大分类，含推荐标签 |
| 搜索 | ✅ | Fuse.js 模糊搜索，工具名/描述/标签 |
| 分类筛选 | ✅ | 顶部标签切换 + 独立分类页 + URL query |
| 排序 | ✅ | 默认 / Star 数 / 名称 A-Z / Z-A |
| 工具详情页 | ✅ | 85 个 SSG 静态页面，含 SEO metadata |
| 对比模式 | ✅ | 最多 4 个工具并排对比 |
| 场景推荐 | ✅ | 问答式匹配引擎 |
| 实战笔记 | ✅ | 6 篇真实体验笔记 |
| Newsletter | ✅ | Mailchimp 嵌入，JSONP 前端直连 |
| GA 埋点 | ✅ | GA4，测量 ID: G-BV6QVKF8EN |
| SEO | ✅ | metadata + sitemap + robots + GSC |
| 分类独立页 | ✅ | 6 个 /category/[slug] 静态页面 |
| Analytics 仪表盘 | ✅ | 开发环境可见 |
| 广告位 | 埋好未售 | 列表顶/中/底三个广告槽位 |
| 赞助商 | 埋好未售 | SponsorBanner 组件 + 价格体系 |

## 盈利模型

| 收入源 | 价格 | 状态 |
|--------|------|------|
| 首页广告位 × 3 | $199/月 | 待售 |
| 招聘帖 | $149/月 | 待售 |
| 联盟佣金 | 各平台不同 | 已预埋 |
| Newsletter 赞助 | 待定 | 订阅积累中 |

## 技术栈

| 层 | 选型 |
|----|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS |
| 搜索 | Fuse.js (客户端) |
| 部署 | Cloudflare Pages (静态导出) |
| 版本控制 | GitHub: Gchhcyh/ai-coding-nav |
| 分析 | Google Analytics 4 |
| 邮件 | Mailchimp Free |

## 快速开始

```bash
# 克隆项目
git clone https://github.com/Gchhcyh/ai-coding-nav.git
cd ai-coding-nav

# 安装依赖
npm install

# 本地开发
npm run dev
# 访问 http://localhost:3000

# 构建静态文件
npm run build
# 输出到 out/ 目录
```

## 项目结构

```
ai-coding-nav/
├── app/
│   ├── layout.tsx              # Root layout + metadata + GA script
│   ├── page.tsx                # 首页（搜索/筛选/排序/工具网格）
│   ├── globals.css             # Tailwind + 自定义样式
│   ├── analytics/
│   │   └── page.tsx            # Analytics 仪表盘
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx        # 6 个分类独立静态页面
│   ├── tools/
│   │   └── [slug]/
│   │       └── page.tsx        # 工具详情页（SSG + SEO metadata）
│   ├── notes/
│   │   ├── page.tsx            # 笔记列表页
│   │   └── [slug]/
│   │       └── page.tsx        # 笔记详情页
│   ├── compare/
│   │   └── page.tsx            # 工具对比页
│   ├── recommend/
│   │   └── page.tsx            # 场景推荐页
│   └── changelog/
│       └── page.tsx            # 更新日志页
├── components/
│   ├── Header.tsx              # 导航栏（6 分类链接）
│   ├── SearchBar.tsx           # 搜索框（Fuse.js）
│   ├── CategoryFilter.tsx      # 分类标签筛选
│   ├── ToolCard.tsx            # 工具卡片
│   ├── CompareBar.tsx          # 底部对比栏
│   ├── Newsletter.tsx          # Mailchimp 订阅表单
│   ├── SponsorBanner.tsx       # 广告位组件
│   └── Footer.tsx
├── data/
│   ├── tools.json              # 84 个工具的完整数据
│   └── notes.json              # 6 篇实战笔记
├── lib/
│   ├── tools.ts                # 分类定义 + 工具类型
│   └── monetization.ts         # 联盟标签 + 赞助配置
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── googlea95a533abb7dab08.html  # GSC 验证
└── next.config.js              # output: "export" + trailingSlash
```

## 工具数据模型 (tools.json)

```typescript
interface Tool {
  slug: string;         // URL slug, 如 "cursor"
  name: string;         // 工具名称
  description: string;  // 一句话描述
  category: string;     // 分类: ai-ide | agent-framework | mcp-tools | code-review | testing-qa | dev-tools
  url: string;          // 官网链接
  tags: string[];       // 标签, 如 ["editor", "vscode"]
  stars?: number;       // GitHub Star 数（可选）
  featured: boolean;    // 是否精选推荐
  pricing: string;      // Free | Freemium | Paid
  badge?: string;       // 荣誉标签
  pros?: string[];      // 优点列表
  cons?: string[];      // 缺点列表
  best_for?: string;    // 最适合场景
  not_for?: string;     // 不适合场景
}
```

## 6 大分类

| 分类 ID | 名称 | 数量 | 示例 |
|---------|------|------|------|
| ai-ide | AI IDE & 编辑器 | 18 | Cursor, Copilot, Claude Code, Cline |
| agent-framework | Agent 开发框架 | 13 | LangGraph, CrewAI, Dify, OpenHands |
| mcp-tools | MCP 工具 & 插件 | 15 | Smithery, Puppeteer MCP, Filesystem MCP |
| code-review | AI 代码审查 | 9 | CodeRabbit, Codeball, DeepSource |
| testing-qa | AI 测试工具 | 10 | Applitools, TestSigma, Mabl, Keploy |
| dev-tools | AI 开发工具 | 19 | v0.dev, Bolt.new, Supabase, Vercel AI SDK |

## 当前存在的问题

### Bug
1. ~~导航栏分类链接不生效~~ ✅ 已修复（P0#3：useRouter.push 同步 URL）
2. **Newsletter 无欢迎邮件** — Mailchimp 嵌入表单默认不触发欢迎邮件，需要在 Mailchimp 后台配置 Automation

### 设计
3. **整体 UI 偏暗** — 当前 bg-gray-950 纯黑背景 + 深灰卡片，视觉沉闷。需要整体配色方案升级，考虑：
   - 主背景更换为更柔和的深色或浅色方案
   - 卡片容器增加层次感和微交互
   - 字体排版优化

### 功能缺口
4. 无管理后台（工具数据靠手动编辑 JSON）
5. 无用户系统（无法收藏/评论/提交）
6. 移动端适配可进一步优化

## 部署流程

```bash
npm run build          # 生成 out/ 目录
git add -A
git commit -m "xxx"
git push origin main   # Cloudflare Pages 自动构建部署
```

Cloudflare Pages 监听 `main` 分支，构建命令 `npm run build`，输出目录 `out`。

## Product Hunt 上线

已正式上线 Product Hunt。
- 产品页: https://www.producthunt.com/products/ai-coding-nav

---
*最后更新: 2026-06-25*
