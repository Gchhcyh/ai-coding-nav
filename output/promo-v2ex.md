# V2EX 推广文案

**节点**：分享创造 (/go/create) 或 程序员 (/go/programmer)

**标题**：花两周测了 18 个 AI 编程工具，做了个开源对比导航站

---

**正文**：

最近三个月在选 AI 编程工具这件事上花了不少时间，Cursor、Copilot、Claude Code、Aider、Cline、Windsurf 全都用过。市面上能找到的导航站也翻了个遍，但说实话——大部分就是工具名 + 一句话简介 + 链接，完全帮不上忙。

比如说，Cursor 和 Windsurf 到底差在哪？什么情况下该选 Claude Code 而不是 Cursor？没有一个站能告诉我。

所以自己动手做了一个：[AI Coding Nav](https://ai-coding-nav.pages.dev)

## 和别的导航站有什么不同

1. **对比模式**：最多 4 个工具并排对比，直观看到每个工具的优缺点、适合场景、不适合场景
2. **实测笔记**：不是搬运官网介绍，是每个工具真正用下来的感受。比如 Cursor 的 Composer 模式确实好，但上下文偶尔丢失是个坑；Claude Code 处理复杂后端任务碾压一切，但没 IDE 集成
3. **场景推荐**：不确定选什么？告诉网站你的开发场景，它会帮你匹配工具

## 技术栈

- Next.js 14 (App Router) + Tailwind CSS
- 纯静态导出，部署在 Cloudflare Pages
- 所有工具数据在 `data/tools.json` 里，欢迎提 PR 补充
- 搜索用 Fuse.js（客户端），无后端，无数据库
- Google Analytics 4 埋了，但没有广告

## 目前收录

- 84 个工具，6 个分类（AI IDE、Agent 框架、MCP 工具、代码审查、测试工具、DevOps）
- 3 篇实测笔记（会持续更新）
- GitHub: https://github.com/Gchhcyh/ai-coding-nav

## 一些心得

测了这么多工具，最大的感受是：**没有"最好的"AI 编程工具，只有最适合你工作流的工具**。

如果你是全栈开发，每天 8 小时在 IDE 里，Cursor 的综合体验最好。如果你习惯 Neovim + 终端，Aider 会让你很舒服。如果你主要做后端/架构，Claude Code 的推理能力确实更胜一筹。

欢迎试试，有什么工具想让我加入或评测的，帖子里回复就行。

---

PS：Product Hunt 上也上线了，感兴趣可以给个 upvote：https://www.producthunt.com/products/ai-coding-nav
