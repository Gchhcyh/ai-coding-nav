# AI Coding Nav — 项目总览文档

> 最后更新：2026-07-01 | 最新 commit：技能系统部署

---

## 1. 项目概述

**AI Coding Nav** 是一个 **AI 编程工具全链路导航站**，覆盖从 AI IDE、Agent 框架、MCP 工具到代码审查、AI 测试、辅助开发工具的全品类。项目旨在为开发者提供一站式发现、筛选、对比 AI 编程工具的平台。

| 项目属性 | 说明 |
|----------|------|
| 项目名称 | AI Coding Nav |
| 定位 | AI 编程工具全链路导航站 |
| 仓库 | [github.com/Gchhcyh/ai-coding-nav](https://github.com/Gchhcyh/ai-coding-nav) |
| 部署域名 | [ai-coding-nav.pages.dev](https://ai-coding-nav.pages.dev) |
| 技术栈 | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| 渲染模式 | SSG（Static Site Generation） |
| 部署平台 | Cloudflare Pages |

---

## 2. 数据规模

| 指标 | 数值 |
|------|------|
| AI 编程工具总数 | **89** |
| 分类数 | **6** |
| SSG 静态导出页面数 | **94** |

### 分类明细

| 分类 | 英文标识 | 工具数 | 颜色主题 |
|------|----------|--------|----------|
| AI IDE | `ai-ide` | 21 | — |
| Agent 框架 | `agent-frameworks` | 16 | — |
| MCP 工具 | `mcp-tools` | 15 | — |
| 代码审查 | `code-review` | 9 | — |
| AI 测试 | `testing-qa` | 6 | Teal |
| 开发工具 | `dev-tools` | 17 | — |

---

## 3. 技术架构

### 3.1 技术栈

- **框架**：Next.js 14（App Router）
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **渲染**：SSG 全静态导出（`next build && next export`）
- **部署**：Cloudflare Pages

### 3.2 项目结构（核心目录）

```
ai-coding-nav/
├── app/                     # Next.js App Router 页面
│   ├── layout.tsx           # 全局布局（OG/metadata）
│   ├── page.tsx             # 首页
│   └── tools/
│       └── [slug]/page.tsx  # 工具详情页（动态路由 SSG）
├── components/              # 可复用组件
│   ├── CategoryFilter.tsx   # 分类筛选
│   ├── SearchBar.tsx        # 搜索栏
│   ├── ToolCard.tsx         # 工具卡片
│   └── Newsletter.tsx       # Newsletter 订阅
├── data/                    # 工具数据
├── public/                  # 静态资源
├── out/                     # SSG 导出产物
├── scripts/
│   └── verify-build.js      # 构建后自动化验证（18 项）
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── submit-tool.yml  # GitHub Issue 模板
└── sitemap.ts               # 动态 sitemap 生成
```

---

## 4. 核心功能清单

| 功能 | 描述 |
|------|------|
| **首页（Hero + 推荐 + 全列表）** | Hero 区域 + 精选推荐工具 + 完整工具卡片列表 + Newsletter 订阅入口 |
| **分类筛选** | `CategoryFilter` 组件，点击分类后通过 `useRouter.push` 更新 URL 参数，实现筛选状态与 URL 双向同步 |
| **搜索** | `SearchBar` 组件，500ms 防抖搜索，触发 GA4 `search` 事件 |
| **工具详情页** | 动态路由 `/tools/[slug]`，展示标签、价格、链接等完整信息 |
| **Newsletter 订阅** | 动态注入 `script` 标签实现 JSONP 请求，10s 超时兜底 |
| **排序** | 支持 Star 数 / 名称 A-Z / 名称 Z-A 三种排序 |
| **响应式** | 桌面端 + 移动端适配 |
| **SEO** | 动态 sitemap（85 URL）+ OG Image（1200×630）+ Twitter Card metadata + Favicon |
| **分析** | Google Analytics 4 事件追踪：`outbound_click`（工具卡外链点击）、`search`（搜索行为） |

---

## 5. 修复与改进记录

### 5.1 P0（阻塞上线 — 6 项）

| # | 问题 | 解决方案 |
|---|------|----------|
| 1 | sitemap 未随部署生成 | 动态生成 85 条 URL，同时写入 `public/` 和 `out/` 确保 Cloudflare Pages 可访问 |
| 2 | `testing-qa` 分类工具数不足 | 从 4 个补充至 10 个，与其他分类体量对齐 |
| 3 | 分类筛选 URL 不同步 | `CategoryFilter` 使用 `useRouter.push` 实现 URL 参数双向同步 |
| 4 | 详情页 `testing-qa` 配色缺失 | 补全 teal 色主题配色映射 |
| 5 | OG Image / SEO meta 缺失 | 生成 1200×630 OG Image，`layout.tsx` 添加 `og`/`twitter` metadata |
| 6 | Favicon 缺失 | 添加 `.ico` + `.png` + `metadata.icons` 配置 |

### 5.2 P1（发布前 — 5 项）

| # | 问题 | 解决方案 |
|---|------|----------|
| 1 | Newsletter `no-cors` 模式不可靠 | 改为动态注入 `script` 标签 JSONP 请求 + 10s 超时兜底 |
| 2 | Footer 链接不准确/重复 | 「提交工具」指向 GitHub Issues 页，「GitHub」指向仓库页，去除重复链接 |
| 3 | GA4 事件缺失 | 新增 `outbound_click`（工具卡片外链点击）和 `search`（搜索 500ms 防抖触发） |
| 4 | README 数据陈旧 | 更新工具总数 78→84，修正各分类计数 |
| 5 | 无构建后验证 | `verify-build.js`：18 项自动化检查（页面数、路径、资源完整性等） |

### 5.3 架构师残余问题（3 项）

| # | 问题 | 解决方案 |
|---|------|----------|
| 1 | sitemap 仅写入一处导致 Cloudflare 部署后 404 | sitemap 同时写入 `public/` 和 `out/` |
| 2 | Newsletter JSONP 无超时保护 | 添加 10s 超时兜底 |
| 3 | Footer 链接重复 | 两项链接各指向不同 URL（Issues / 仓库） |

### 5.4 UI 精简（3 项）

| # | 改动 | 说明 |
|---|------|------|
| 1 | Header 导航栏移除 6 个分类链接 | 与下方 `CategoryFilter` 功能重复，去除冗余 |
| 2 | 移动端导航同步精简 | 移动端菜单同步移除分类入口 |
| 3 | Footer 链接去重 | 「提交工具」→ Issues 页，「GitHub」→ 仓库页，不再重复 |

---

## 6. 部署与环境

| 项目 | 说明 |
|------|------|
| 部署平台 | Cloudflare Pages |
| 域名 | `ai-coding-nav.pages.dev` |
| 构建命令 | `next build && next export` |
| 输出目录 | `out/` |
| SSL | Cloudflare 自动提供 |
| CI/CD | 连接 GitHub 仓库，push 自动触发构建部署 |

---

## 7. Product Hunt 上线进度

### 7.1 已完成

| 事项 | 状态 |
|------|------|
| GitHub Issue 模板 `submit-tool.yml` | 已完成 |
| PH Gallery 截图（5 张，1270×760） | 已完成 |
| Thumbnail（240×240） | 已完成 |
| PH 上线清单文档 | 已完成 [`output/ProductHunt上线清单.md`](F:/webdemo/ai-coding-nav/output/ProductHunt上线清单.md) |
| PH Coming Soon 页面 | 已在 [producthunt.com](https://producthunt.com) 发布 |

### 7.2 清单文档内容概要

- **Tagline**：已拟定
- **Description**：已撰写
- **Maker Comment**：已撰写
- 以上内容详见 `output/ProductHunt上线清单.md`

---

## 8. Git 提交历史（关键节点）

| Commit | 说明 |
|--------|------|
| `a6496b2` | 最新提交（HEAD） |
| （更早） | PH Coming Soon 准备：截图、Thumbnail、清单文档 |
| （更早） | UI 精简：Header/移动端移除分类链接、Footer 去重 |
| （更早） | P1 修复：Newsletter JSONP、GA4 事件、README 更新、verify-build.js |
| （更早） | P0 修复：sitemap、分类补全、URL 同步、OG/Favicon |
| （更早） | 核心功能开发：首页、筛选、搜索、详情页、排序、响应式 |

---

## 9. AI 自动化技能系统

基于 Claude Code Skill 机制的自动化运营系统，灵感来自 [Show Me The Money](https://github.com/iamzifei/show-me-the-money)。

### 架构
```
.claude/skills/
├── _guardrails.md           ← 安全护栏（所有 skill 遵守）
├── _tools-schema.md         ← tools.json 27 字段参考
├── _categories.md           ← 6 分类定义 + 关键词
├── tool-scout/SKILL.md      ← /tool-scout 工具发现引擎
├── review-writer/SKILL.md   ← /review-writer 测评写作器
├── link-doctor/SKILL.md     ← /link-doctor 链接健康维护
├── promo-forge/SKILL.md     ← /promo-forge 推广文案工厂
├── state/                   ← 跨会话状态（gitignore）
└── templates/               ← 输出模板
```

### 技能列表

| 技能 | 命令 | 功能 |
|------|------|------|
| 工具发现 | `/tool-scout [--auto-add]` | 扫描 GitHub/PH/HN/Reddit 发现新 AI 工具，评分后入库 |
| 测评写作 | `/review-writer --mode coverage\|compare\|update\|single` | 自动生成中文实测测评 |
| 链接维护 | `/link-doctor` | 运行链接检查 + 分析失效 + 修复 URL |
| 推广文案 | `/promo-forge --platform v2ex\|reddit\|hn\|zhihu\|twitter` | 生成各平台推广文案 |

### 护栏设计
- 四层护栏：编辑边界 → 并发限制 → 变更验证 → 运行记录
- 只写入 `data/*.json` 和 `output/*.md`，不碰源码
- 只追加不删除，默认生成报告等人工审核
- 所有变更后自动运行 `verify-build.js`

---

*本文档由 File Agent 基于项目最新状态自动生成。*
