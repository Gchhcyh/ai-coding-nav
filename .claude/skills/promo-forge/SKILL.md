# promo-forge — 推广文案工厂

## 概述
基于站点最新数据自动生成各平台推广文案。支持 V2EX、Reddit、Hacker News、知乎、Twitter/X 等平台。内容风格匹配各平台社区文化，数据驱动，每次产出不同的角度和工具亮点。

## 触发方式
在 Claude Code 中输入：
- `/promo-forge --platform v2ex` — 生成 V2EX 推广帖
- `/promo-forge --platform reddit` — 生成 Reddit 推广帖
- `/promo-forge --platform hn` — 生成 Hacker News Show HN 帖
- `/promo-forge --platform zhihu` — 生成知乎回答/文章
- `/promo-forge --platform twitter` — 生成 Twitter/X thread

## 输入
- `data/tools.json` — 工具数据（统计用）
- `data/notes.json` — 测评内容（亮点摘引用）
- `output/` 目录下的历史推广文案 — 参考风格、避免重复角度
- `.claude/skills/state/promo-state.json` — 发布历史
- `.claude/skills/templates/promo-v2ex.md` — V2EX 模板
- `.claude/skills/_guardrails.md` — 安全护栏

---

## 各平台文案规范

### V2EX（/go/create）
**定位**: 技术创造分享，数据驱动，个人建站故事
**语气**: 真诚、分享、不吹不黑
**字数**: 800-1500 字
**结构**:
1. 开头 100 字：为什么做这个站（真实背景）
2. 数据亮点：收录 N 个工具、6 大分类、20+ 字段、推荐引擎
3. 技术栈一句话：Next.js + TypeScript + Tailwind + Cloudflare Pages
4. 特色功能简述（每次选不同角度）：
   - 对比模式怎么用
   - 推荐引擎怎么设计
   - 工具 scoring 标准
   - 分类体系怎么定的
5. 近期新增工具列表（3-5 个）
6. 诚邀反馈 + GitHub 链接
7. Footer：🔗 网址 + ⭐ GitHub

### Reddit（r/programming, r/aicoding）
**定位**: 英文技术社区，数据对比 + tool discovery value
**语气**: Technical, straightforward, no marketing fluff
**字数**: 400-800 words
**结构**:
1. Hook: What problem this solves (AI tool discovery fatigue)
2. What it is: curated directory with structured data
3. Why it's useful: comparison engine, recommendation wizard, 20+ fields per tool
4. Recent additions and interesting stats
5. Ask for feedback + GitHub link

### Hacker News（Show HN）
**定位**: 创业/技术交叉，curation methodology, data-driven
**语气**: Builders' perspective, intellectually honest
**字数**: 300-600 words
**结构**:
1. Show HN: AI Coding Nav — a curated directory with comparison engine
2. Why I built it and the curation methodology
3. Interesting findings from building it (data insights)
4. Tech stack + architecture decisions
5. What's next + ask for feedback

### 知乎
**定位**: 中文知识分享，方法论 + 经验
**语气**: 专业、结构化、有干货
**字数**: 1000-2000 字
**结构**:
1. 回答一个问题框架（如"2026 年有哪些好用的 AI 编程工具？"）
2. 分类介绍 + 每个分类下 1-2 个推荐
3. 选工具的方法论（3 个关键维度）
4. 实测经验和避坑指南
5. 底部推荐导航站（软性植入）

### Twitter/X Thread
**定位**: 每条一个独立 insight，数据可视化
**字数**: 8-12 条，每条 ≤ 280 字符
**结构**:
1. Hook tweet: 一个反直觉的数据点
2. 工具总数 + 分类分布
3. 最被低估的 3 个工具
4. 对比功能的趣味发现
5. CTA: 链接 + GitHub

---

## 执行流程

### Step 1: 加载数据
```
Read data/tools.json
Read data/notes.json
Read .claude/skills/state/promo-state.json
```

提取：
- 工具总数、分类分布
- featured 工具列表
- 最新加入的 5 个工具（按 added_date 排序）
- 最新发布的 3 篇测评（按 date 排序）
- 该平台上次发布的角度/内容（避免重复）

### Step 2: 选择叙事角度

每次生成必须选择与上次不同的角度。角度轮换表：

| 角度编号 | V2EX | Reddit/HN | 知乎 | Twitter |
|----------|------|-----------|------|---------|
| 1 | 建站过程与技术选型 | Comparison data & methodology | 工具选型方法论 | 反直觉数据点 |
| 2 | 工具生态趋势观察 | Curation philosophy | 实测对比深度体验 | 最被低估的工具 |
| 3 | 解决的实际问题 | Interesting stats from data | 新手入门指南 | 工具组合推荐 |
| 4 | 推荐引擎设计思路 | Tool discovery problem | 行业趋势分析 | 对比功能发现 |
| 5 | 社区贡献 & 开源 | Why structured over algorithmic | 避坑指南 | 本周新工具 |

检查 `promo-state.json` 中该平台上次使用的角度，选择下一个。

### Step 3: 生成文案

按平台规范生成文案。要求：
- 包含最新数据（工具总数、分类分布）
- 引用 2-3 个具体工具（避免每次都提同样的）
- 包含 GitHub 链接和网站链接
- 末尾添加：`*(内容由AI辅助生成)*`

### Step 4: 写入文件

写入 `output/promo-{platform}-YYYY-MM-DD.md`。

### Step 5: 更新状态

更新 `.claude/skills/state/promo-state.json`：
- 追加 `campaigns` 记录：`{ platform, date, angle, file }`
- 更新对应平台的 `lastPosted` 和 `posts` 列表
- 更新 `lastRun`、递增 `totalRuns`
- 追加 `runs` 运行记录

---

## 输出产物
1. `output/promo-{platform}-YYYY-MM-DD.md` — 推广文案
2. `.claude/skills/state/promo-state.json` — 状态更新

## 质量检查清单
- [ ] 数据准确（工具数、分类数、工具名都是真实数据）
- [ ] 角度不重复（与上次不同）
- [ ] 包含 GitHub 和网站链接
- [ ] 不虚构用户评价或收入数据
- [ ] 语气匹配平台文化
- [ ] 末尾有 AI 生成声明

## 护栏提醒
- ⚠️ 不修改任何 data/ 文件
- ⚠️ 不修饰收入/用户数（如无 data 支撑）
- ⚠️ 不自动发布（文案生成后需人工审核后手动发布）
- ⚠️ 不冒充真实用户身份
