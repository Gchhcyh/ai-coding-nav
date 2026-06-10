---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: c42aa5508ae870f5f4e8c8fd825baac2_cc26a8ba63c011f1aa705254002afed2
    ReservedCode1: UMOnlKB1E0vuW/5JRQLcBs9SsOt8+P2clFuFFHzT+/ruLnX5xHrUmZB3Z4Nv+RztLrCAdTZVvSHh+OR0aO1ua7LwlqWV6CjojUERuQ/iEf65OF/O6E154lZTZjYDi6w3BXlHPy5K6B40yXrhoD6zgzkfZMrP1Zr+FS4piUN80hFRZfNMKjlW7DBv928=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: c42aa5508ae870f5f4e8c8fd825baac2_cc26a8ba63c011f1aa705254002afed2
    ReservedCode2: UMOnlKB1E0vuW/5JRQLcBs9SsOt8+P2clFuFFHzT+/ruLnX5xHrUmZB3Z4Nv+RztLrCAdTZVvSHh+OR0aO1ua7LwlqWV6CjojUERuQ/iEf65OF/O6E154lZTZjYDi6w3BXlHPy5K6B40yXrhoD6zgzkfZMrP1Zr+FS4piUN80hFRZfNMKjlW7DBv928=
---

# AI Coding Nav

AI 编程工具全链路导航站 —— 收录 84 个 AI 开发工具，覆盖从写代码到部署的完整开发流程。

**线上地址**: [ai-coding-nav.pages.dev](https://ai-coding-nav.pages.dev)

---

## 产品定位

面向开发者的 AI 工具黄页。不做社区、不做 SaaS，核心价值就是**帮开发者 30 秒内找到合适的 AI 工具**。

## 功能清单

| 功能 | 状态 | 说明 |
|------|------|------|
| 工具收录 | ✅ 84 个 | 6 大分类，含推荐标签 |
| 搜索 | ✅ | Fuse.js 模糊搜索，工具名/描述/标签 |
| 分类筛选 | ✅ | 顶部标签切换 + URL query 参数 |
| 排序 | ✅ | 默认 / Star 数 / 名称 A-Z / Z-A |
| 工具详情页 | ✅ | 85 个 SSG 静态页面 |
| 对比模式 | ✅ | 最多 4 个工具并排对比 |
| Newsletter | ✅ | Mailchimp 嵌入，JSONP 前端直连 |
| GA 埋点 | ✅ | GA4，测量 ID: G-BV6QVKF8EN |
| SEO | ✅ | metadata + sitemap.xml + robots.txt + Google Search Console |
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

## 项目结构

```
ai-coding-nav/
├── app/
│   ├── layout.tsx          # Root layout + metadata + GA script
│   ├── page.tsx            # 首页（搜索/筛选/排序/工具网格）
│   ├── globals.css         # Tailwind + 自定义样式
│   └── tools/
│       └── [slug]/
│           └── page.tsx    # 82 个工具详情页（SSG）
├── components/
│   ├── Header.tsx          # 导航栏（6 分类链接）
│   ├── SearchBar.tsx       # 搜索框（Fuse.js）
│   ├── CategoryFilter.tsx  # 分类标签筛选
│   ├── ToolCard.tsx        # 工具卡片
│   ├── CompareBar.tsx      # 底部对比栏
│   ├── Newsletter.tsx      # Mailchimp 订阅表单
│   ├── SponsorBanner.tsx   # 广告位组件
│   └── Footer.tsx
├── data/
│   └── tools.json          # 84 个工具的完整数据
├── lib/
│   ├── tools.ts            # 分类定义 + 工具类型
│   └── monetization.ts     # 联盟标签 + 赞助配置
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── googlea95a533abb7dab08.html  # GSC 验证
└── next.config.js          # output: "export" + trailingSlash
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

预告页已创建，设定发布日期为 2026-06-16 12:01 AM PT (北京时间 15:01)。
- 预告页: https://www.producthunt.com/products/ai-coding-nav/ai-coding-nav/prelaunch

---
*最后更新: 2026-06-09*
*（内容由AI生成，仅供参考）*
