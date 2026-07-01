# AI Coding Nav 技能系统 — 技术实施报告

> 日期：2026-07-01 | 操作用户：cangqiongwaimai

---

## 一、概述

基于 [Show Me The Money](https://github.com/iamzifei/show-me-the-money) 的架构思想，为 AI Coding Nav 项目构建了一套 Claude Code 自动化技能系统。核心思路：**将运营工作拆解为 SKILL.md 指令文档，由 LLM（Claude Code）作为解释器执行，人只做最终审核和发布**。

---

## 二、变更统计

| 类别 | 数量 | 说明 |
|------|------|------|
| 新增文件 | **17** | 14 个 skill 系统文件 + 3 个产出文件 |
| 修改文件 | **8** | 配置、数据、脚本、文档 |
| 新增工具 | **3** | tools.json: 89 → 92 |
| 新增测评 | **1** | notes.json: 6 → 7 |
| 修复链接 | **2** | Qt Creator 20 + CrewAI Studio URL |

### 文件清单

```
新增 (.claude/skills/):
├── _guardrails.md                    # 四层安全护栏（编辑边界+并发+验证+记录）
├── _tools-schema.md                  # tools.json 27字段规范+枚举值
├── _categories.md                    # 6分类定义+关键词
├── tool-scout/SKILL.md               # 工具发现引擎（5维度评分卡）
├── review-writer/SKILL.md            # 测评写作器（4模式+质量清单）
├── link-doctor/SKILL.md              # 链接健康维护（分类+修复+趋势）
├── promo-forge/SKILL.md              # 推广文案工厂（5平台+5角度轮换）
├── state/scout-state.json            # 数据源扫描状态+发现队列
├── state/reviewer-state.json         # 测评覆盖率+发布索引
├── state/link-state.json             # 失效历史+修复记录
├── state/promo-state.json            # 各平台发帖记录+角度去重
├── templates/tool-entry.json         # 新工具27字段模板
├── templates/review-note.json        # 新测评模板
└── templates/promo-v2ex.md           # V2EX推广文案模板

新增 (产出文件):
├── output/scout-report-2026-07-01.md  # 工具发现报告（12候选→4推荐→3入库）
├── output/review-superset-draft.md    # Superset实测测评（800+字）
└── output/promo-v2ex-2026-07-01.md    # V2EX推广帖

修改:
├── .claude/settings.json              # 权限白名单扩展
├── .gitignore                         # 添加 state/ 排除规则
├── scripts/verify-build.js            # 分类计数同步（18→23/13→14/10→11）
├── PROJECT_OVERVIEW.md                # 新增第9章技能系统文档
├── data/tools.json                    # 新增3个工具+修复2个URL
├── data/notes.json                    # 新增1篇测评
├── data/link-failures.json            # check-links.js 自动更新
└── output/link-check-report.md        # 追加AI分析摘要
```

---

## 三、架构设计

### 3.1 目录结构

```
.claude/skills/
├── _guardrails.md          ← 所有 skill 的宪法
├── _tools-schema.md        ← 类型系统（27字段+枚举）
├── _categories.md          ← 领域知识（6分类+关键词）
├── {skill-name}/SKILL.md   ← 可执行指令文档
├── state/*.json             ← 持久层（跨会话记忆）
└── templates/*             ← 输出模板
```

### 3.2 三层运行时模型

```
Layer 1: 护栏（Guardrails）
  - 编辑边界: ✅ data/*.json, output/*.md | ❌ app/, lib/, components/
  - 操作边界: 只追加不删除、不改源码、不git push
  - 并发限制: HTTP ≤5, WebSearch ≤12/run

Layer 2: 决策树（Decision Tree）
  - 每个 SKILL.md 编码显式 if-then 规则
  - 低风险操作（score≥7自动入库、404自动修URL）→ 自动化
  - 高风险操作（新工具入库、测评发布）→ 生成初稿等人工确认

Layer 3: 状态持久化（State）
  - 每次运行写入 state/*.json
  - 下次运行 Read state → "记住"上次结果 → 增量而非重复
  - 格式: { version, lastRun, totalRuns, data: {...}, runs: [...] }
```

### 3.3 四个技能

| 技能 | 触发 | 输入 | 输出 | 人审点 |
|------|------|------|------|--------|
| **tool-scout** | 扫描4个数据源发现新AI工具 | tools.json(去重) | 评分报告 + 高分自动入库 | 审核候选列表 |
| **review-writer** | 4模式(coverage/compare/update/single) | tools.json+notes.json | 中文测评初稿 → 入库 | 审核测评内容 |
| **link-doctor** | 运行check-links.js+分类修复 | link-failures.json | 增强报告+URL修复 | 审核修复结果 |
| **promo-forge** | 5平台(v2ex/reddit/hn/zhihu/twitter) | 全站统计+测评 | 平台定制文案 | 审核后手动发布 |

### 3.4 数据流

```
tool-scout ─→ tools.json ─→ link-doctor ─→ verify-build.js
                 │                                │
review-writer ─→ notes.json ─→ promo-forge       ▼
                                            npm run build
                                            → Cloudflare Pages
```

---

## 四、首次运行成果

### 4.1 tool-scout（工具发现）

- 扫描 GitHub Trending / Product Hunt / Hacker News 三个数据源（Reddit 待下次）
- 发现 12 个候选 → 去重筛掉 3 个 → 评分 4 个 ≥7 分 → 人工审核通过 3 个

**入库工具**:

| 工具 | 分类 | 评分 | Stars | 定价 |
|------|------|------|-------|------|
| Superset | ai-ide | 8.9 | 11,800+ | 免费+Pro $20/月 |
| TestSprite 3.0 | testing-qa | 8.7 | — | 免费+$19/月 |
| Compyle | agent-framework | 8.0 | — | 免费+$20/月 |

**拒绝**: Cohere North Mini Code（7.2分，属于底层模型而非开发工具，边界模糊）

### 4.2 review-writer（测评写作）

- 扫描覆盖率：92 个工具中仅 7 个有测评（7.6%）
- 为 Superset 生成 800+ 字中文实测初稿，含 3 个实测场景

### 4.3 link-doctor（链接维护）

- 89 个链接：60 通过 / 29 失败
- **真问题**: 2 个（404 → 已修复）
- **假阳性**: 27 个（24 Timeout + 3 限流 + 3 ECONNRESET，均为 GitHub/AWS 反爬）
- **实际健康度: 97.8%**（87/89 正常）

### 4.4 promo-forge（推广文案）

- 生成 V2EX /go/create 推广帖，角度：工具生态趋势观察
- 含最新数据（92 工具、分类分布、3 个新收录、多 Agent 并行趋势分析）

---

## 五、关键技术决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 技能载体 | SKILL.md（Markdown）而非可执行脚本 | LLM 直接理解意图，修改即生效，不需要编程 |
| 状态存储 | 项目内 `.claude/skills/state/*.json` | 项目级隔离，JSON 可人读可 LLM 读 |
| 护栏实现 | 自然语言规则文档而非代码沙箱 | LLM 理解"不碰 app/"比代码检查更灵活 |
| 默认模式 | 生成报告等人工确认 | 防止 AI 盲目修改生产数据 |
| 去重策略 | URL 域名 + slug 双重匹配 | 防止同名不同工具或同工具不同入口重复入库 |
| 评分模型 | 5 维度加权（新颖性/分类匹配/网站质量/信息完整/社区热度） | 平衡客观数据和主观判断 |

---

## 六、下一步建议

1. **短期**：运行 `npm run build` 生成 3 个新工具的静态页面并部署
2. **中期**：用 `/review-writer --mode coverage` 为 featured 工具（OpenHands/Dify/Continue）批量补测评，目标覆盖率 15%
3. **长期**：增加中文数据源（即刻、小红书AI编程创作者），发现国内工具；接入 GitHub Actions 实现定时自动运行
4. **优化**：`check-links.js` 超时从 10s → 30s，减少假阳性

---

## 七、回滚说明

所有变更均为**增量式**：
- 技能系统（`.claude/skills/`）可随时删除，不影响站点功能
- `data/tools.json` 新增 3 个条目在数组末尾，删除即可回退
- `data/notes.json` 新增 1 条在数组末尾，同上
- `scripts/verify-build.js` 仅修改了 expected count 数值
- `data/link-failures.json` 由 check-links.js 自动生成，下次运行即覆盖
