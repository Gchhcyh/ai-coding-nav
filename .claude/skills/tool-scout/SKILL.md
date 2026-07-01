# tool-scout — AI 编程工具发现引擎

## 概述
从 GitHub Trending、Product Hunt、Hacker News、Reddit 等数据源自动发现新的 AI 编程工具，评估质量后生成候选报告或直接入库。

## 触发方式
在 Claude Code 中输入：
- `/tool-scout` — 扫描发现，生成报告，等待人工审核
- `/tool-scout --auto-add` — 高分工具（≥7分）直接写入 tools.json

## 输入
- `data/tools.json` — 现有工具目录（用于去重）
- `.claude/skills/state/scout-state.json` — 扫描历史
- `.claude/skills/_tools-schema.md` — 27 字段 schema
- `.claude/skills/_categories.md` — 6 大分类关键词
- `.claude/skills/_guardrails.md` — 安全护栏

---

## 执行流程

### Step 1: 加载上下文
```
Read .claude/skills/state/scout-state.json
Read data/tools.json
```
提取：
- 各数据源的 `lastScanned` 时间
- 所有已有工具的 `slug` 列表（用于去重）
- 所有已有工具的 `url` 域名列表（用于去重）

### Step 2: 确定扫描范围
只扫描 7 天前（或从未扫描）的数据源。如果所有源都在 7 天内扫描过，输出 "所有数据源在 7 天内已扫描，跳过" 并结束。

### Step 3: 搜索发现

对每个待扫描源，执行搜索：

**GitHub Trending**（编程工具）：
```
WebSearch: "new AI coding tool github trending 2026"
WebSearch: "best AI developer tools launched 2026"
WebSearch: "AI code editor agent framework new release github"
```

**Product Hunt**（AI 分类）：
```
WebSearch: "product hunt AI developer tools new launches"
WebSearch: "AI coding assistant product hunt trending"
WebSearch: "best new AI dev tools product hunt 2026"
```

**Hacker News Show**：
```
WebSearch: "Show HN AI coding tool 2026"
WebSearch: "HN new AI developer productivity tool"
```

**Reddit**：
```
WebSearch: "reddit r/programming new AI coding tool 2026"
WebSearch: "reddit best AI IDE agent framework 2026"
```

**约束**: 总共不超过 12 次搜索。每次取前 3~5 个结果。

### Step 4: 提取候选工具

对搜索结果的 Top 3 进行信息提取。WebFetch 每个候选工具的 landing page：

```
WebFetch(url=候选工具网址, prompt="提取：产品名称、一句话描述、定价信息、GitHub 链接（如有）、产品分类（属于 AI IDE/Agent框架/MCP/代码审查/测试/开发工具中的哪一类）")
```

尽可能填充 tool-entry 模板中的字段：
- `name` ← 产品名称
- `description` ← 一句话描述（翻译为中文）
- `url` ← 官方网站
- `category` ← 判断所属分类
- `pricing` ← 定价信息
- `tags` ← 从描述中提取技术关键词
- `stars` ← GitHub stars（如有）

### Step 5: 去重检查

对每个候选：
1. 将候选 URL 提取域名
2. 与 `data/tools.json` 中所有工具的 URL 域名对比
3. 域名匹配 → 计入 `duplicateSlugs`，跳过
4. 名称高度相似（编辑距离 < 3）→ 标记警告

### Step 6: 评分

使用 5 维度评分卡：

| 维度 | 权重 | 评分标准 |
|------|------|---------|
| 新颖性 | 25% | 0-10：是否已有大量同类工具被收录？越独特分数越高 |
| 分类匹配 | 25% | 0-10：能否明确归到 6 个分类之一？越匹配分数越高 |
| 网站质量 | 20% | 0-10：网站是否清晰、有文档、有 pricing 页？ |
| 信息完整 | 20% | 0-10：能否填充多少字段？（20+字段=10分，10-19=5分，<10=2分）|
| 社区热度 | 10% | 0-10：GitHub Stars / PH upvotes 多少？ |

**总分 = 新颖性×0.25 + 分类匹配×0.25 + 网站质量×0.20 + 信息完整×0.20 + 社区热度×0.10**

判定：
- ≥ 7 分 → **强烈推荐**（--auto-add 模式下直接入库）
- 5~6 分 → **可考虑**（进入候选队列，人工审核）
- < 5 分 → **暂不收录**（进入 rejected 列表）

### Step 7: 输出

#### 7a. 生成发现报告
写入 `output/scout-report-YYYY-MM-DD.md`：

```markdown
# AI 工具发现报告 — {date}

## 扫描概况
- 扫描数据源: {sources_scanned}
- 发现候选: {total_candidates} | 推荐收录: {recommended} | 需人工审核: {pending} | 已拒绝: {rejected}

## 强烈推荐 ⭐（≥7分，建议直接收录）
### [{name}]({url}) — {score}分
- **分类**: {category}
- **定价**: {pricing}
- **一句话**: {description}
- **推荐理由**: {reason}
- **缺失字段**: {missing_fields}

## 可考虑（5-6分，待审核）
（同上格式）

## 已拒绝（<5分）
| 名称 | 分数 | 拒绝原因 |
|------|------|---------|
| {name} | {score} | {reason} |

## 重复跳过
{duplicate_list}

## 下次扫描建议
- 建议下次扫描日期: {next_scan_date}
- 重点关注分类: {focus_categories}
```

#### 7b. 自动入库（仅 --auto-add）
对 score ≥ 7 的候选：
- 按 `_tools-schema.md` 补全至少 20 个字段
- `added_date` 设为今天
- `featured` 设为 `false`
- `badge` 设为 `null`
- 追加到 `data/tools.json` 数组末尾
- 运行 `node scripts/verify-build.js` 验证

### Step 8: 更新状态
更新 `.claude/skills/state/scout-state.json`：
- 更新各数据源的 `lastScanned` 时间戳
- 追加 `discovered` 队列（新发现的候选）
- 追加 `added` 列表（已入库的）
- 追加 `rejected` 列表（被拒绝的）
- 追加 `duplicateSlugs`（重复的）
- 更新 `lastRun`、递增 `totalRuns`
- 追加 `runs` 运行记录

---

## 输出产物
1. `output/scout-report-YYYY-MM-DD.md` — 发现报告
2. `data/tools.json` — 如有 --auto-add 且高分工具，追加新条目
3. `.claude/skills/state/scout-state.json` — 状态更新

## 幂等性保证
- 7 天内不重复扫描同一数据源
- 去重检查防止重复添加
- 重复运行不产生重复条目

## 护栏提醒
- ⚠️ 绝不删除 tools.json 现有条目
- ⚠️ 新条目必须通过 `verify-build.js`
- ⚠️ HTTP 请求不超过 5 并发
