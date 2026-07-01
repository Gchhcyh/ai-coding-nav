# AI 工具发现报告 — 2026-07-01

## 扫描概况
- 扫描数据源: GitHub Trending / Product Hunt / Hacker News / Reddit
- 发现候选: 12 | 推荐收录: 4 | 已拒绝: 5 | 重复: 3

---

## ⭐ 强烈推荐（≥7分，建议直接收录）

### 1. Superset — 8.9分 🏆

| 字段 | 值 |
|------|-----|
| **名称** | Superset |
| **URL** | https://github.com/superset-sh/superset |
| **分类** | ai-ide |
| **定价** | 免费 + Pro $20/月 |
| **Stars** | 11,800+ |
| **一句话** | YC投资的Agent时代IDE，同时运行10+个AI编程Agent互不干扰，Git Worktree沙箱隔离。 |

**评分明细**:
| 维度 | 得分 | 说明 |
|------|------|------|
| 新颖性 | 8 | 独特的Agent编排IDE，不是又一个编辑器 |
| 分类匹配 | 9 | 明确属于AI IDE |
| 网站质量 | 9 | 完整docs、pricing、Discord社区 |
| 信息完整 | 9 | 可填充几乎所有27字段 |
| 社区热度 | 10 | 11.8K stars、PH #1、HN首页两次 |

**推荐理由**: AI编程已进入"多Agent并行"时代，Superset是第一个把Agent编排做成IDE的产品。OpenAI/Google/Microsoft内部都在用。对中文开发者来说填补了"如何同时用好Claude Code + Codex"的工具空白。

**关键卖点**: 每个Agent独立Git Worktree，不会互相覆盖代码；内置Diff查看器统一审查所有Agent的改动。

---

### 2. TestSprite 3.0 — 8.7分 🧪

| 字段 | 值 |
|------|-----|
| **名称** | TestSprite 3.0 |
| **URL** | https://www.testsprite.com |
| **分类** | testing-qa |
| **定价** | 免费 + Starter $19/月 + Standard $69/月 |
| **Stars** | — |
| **一句话** | 12个AI Agent并行自动测试你的应用，像真实用户一样点击找Bug，Auto-Healing选择器自动适应UI变化。 |

**评分明细**:
| 维度 | 得分 | 说明 |
|------|------|------|
| 新颖性 | 7 | AI测试工具不少，但并行Agent+自愈选择器独特 |
| 分类匹配 | 10 | 完美匹配testing-qa分类 |
| 网站质量 | 9 | 完整pricing、CLI/MCP集成文档 |
| 信息完整 | 9 | 字段齐全 |
| 社区热度 | 8 | PH 427 upvotes、100K+开发者使用 |

**推荐理由**: AI写的代码需要AI来测试。TestSprite是目前testing-qa分类里功能最完整的AI原生测试工具：12个并行浏览器实例 + Auto-Healing + CI/CD集成。站内Applitolools偏视觉测试、Keploy偏API测试，TestSprite填补了端到端功能测试的空白。

---

### 3. Compyle — 8.0分 🤝

| 字段 | 值 |
|------|-----|
| **名称** | Compyle |
| **URL** | https://compyle.ai |
| **分类** | agent-framework |
| **定价** | 免费 + Starter $20/月 + Pro $50/月 |
| **Stars** | — |
| **一句话** | "Lovable for Software Engineers"——先问清楚再写代码的AI编程Agent，不盲目自主运行，每一步都和人协作确认。 |

**评分明细**:
| 维度 | 得分 | 说明 |
|------|------|------|
| 新颖性 | 9 | 唯一"question-first"方法论，反主流自主Agent趋势 |
| 分类匹配 | 7 | Agent框架但更偏向编程协作 |
| 网站质量 | 8 | 清晰landing page和pricing |
| 信息完整 | 8 | 大部分字段可填充 |
| 社区热度 | 6 | YC背书但Star数未知，较早期 |

**推荐理由**: 填补了"完全自主Agent"和"纯代码补全"之间的空白——适合复杂、需求模糊的功能开发场景。Claude Code和Copilot偏向"你说我做"，Compyle偏向"我们一起想清楚再做"。对"AI写了一堆但方向不对"的痛点有针对性解决。

---

### 4. Cohere North Mini Code — 7.2分 🧠

| 字段 | 值 |
|------|-----|
| **名称** | Cohere North Mini Code |
| **URL** | https://cohere.com/blog/north-mini-code |
| **分类** | dev-tools |
| **定价** | 完全免费（Apache 2.0） |
| **Stars** | — |
| **一句话** | Cohere首个编码Agent模型，30B参数(MoE仅3B激活)，Apache 2.0开源，单张H100可跑，专为agentic coding训练。 |

**评分明细**:
| 维度 | 得分 | 说明 |
|------|------|------|
| 新颖性 | 6 | 编码开源模型很多，但专为agent workflow训练的不同 |
| 分类匹配 | 6 | 更偏底层模型，放在dev-tools较勉强 |
| 网站质量 | 8 | 完整blog + HuggingFace |
| 信息完整 | 6 | 是模型非工具，很多字段不适用 |
| 社区热度 | 9 | Cohere官方发布，国内外大量报道 |

**⚠️ 注意**: 这是一个模型而非开发工具。收录进工具导航的边界较模糊。建议标注为"底层模型/基础设施"或在dev-tools分类下特别说明。

---

## 🔍 可考虑（5-6分，待审核）
*（本次扫描无5-6分候选，所有候选都在7分以上或被拒绝）*

---

## ❌ 已拒绝（<5分或重复）

| 名称 | 分数 | 拒绝原因 |
|------|------|---------|
| MiMo Code | — | 域名(github.com/xiaomi)与已有工具重叠，小米生态 |
| DeepSeek TUI | — | 域名(github.com/deepseek)可能与现有DeepSeek工具重叠 |
| TakoVM (sandbox) | 4 | 太底层，是AI Agent的基础设施而非开发者直接使用的工具 |
| 微软 SkillOpt | — | 域名(github.com/microsoft)重叠，且偏研究 |
| Replit Agent | — | Replit已收录 |

---

## 🔄 重复跳过
- MiMo Code → 域名匹配已有 Xiaomi/GitHub 相关条目
- DeepSeek TUI → DeepSeek 相关工具已存在
- SkillOpt → Microsoft/GitHub 域名与已有工具重叠

---

## 📊 本次扫描统计

| 指标 | 值 |
|------|-----|
| 总候选 | 12 |
| 推荐收录 | 4 |
| 需人工审核 | 0 |
| 已拒绝 | 5 |
| 重复跳过 | 3 |
| AI可自动添加 | 3 (Superset, TestSprite, Compyle) |
| 建议人工决定 | 1 (Cohere North Mini Code) |

---

## 💡 下次扫描建议
- 建议日期: **2026-07-08**（7天后）
- 重点关注: agent-framework 分类（当前仅13个工具，增长空间最大）
- 新增数据源建议: **即刻/小红书** 上关注 AI 编程工具的创作者评测
- check-links.js 超时优化后重新评估 GitHub 链接的 24 个假阳性
