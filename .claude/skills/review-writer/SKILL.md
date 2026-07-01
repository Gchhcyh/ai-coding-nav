# review-writer — 测评内容生成器

## 概述
为收录的 AI 编程工具自动撰写中文实测测评，支持单一工具测评、同类对比、旧测评更新等四种模式。产出符合 `data/notes.json` schema 的标准化测评内容。

## 触发方式
在 Claude Code 中输入：
- `/review-writer --mode coverage` — 为缺少测评的工具补测评
- `/review-writer --mode compare` — 找出同类工具对，写对比测评
- `/review-writer --mode update` — 更新超过 3 个月的旧测评
- `/review-writer --mode single --tool <slug>` — 为指定工具写测评

## 输入
- `data/tools.json` — 工具信息
- `data/notes.json` — 已有测评
- `.claude/skills/state/reviewer-state.json` — 写作状态
- `.claude/skills/templates/review-note.json` — 测评模板
- `.claude/skills/_guardrails.md` — 安全护栏

---

## 执行流程

### Step 1: 加载上下文
```
Read .claude/skills/state/reviewer-state.json
Read data/tools.json
Read data/notes.json
```

提取：
- 已有测评的 `tool_slug` 列表
- 各测评的 `date`（判断是否需要更新）
- 工具的详细信息（用作素材）

### Step 2: 确定写作目标

按 mode 确定目标：

**coverage 模式**：
1. 从 `tools.json` 提取所有 slug
2. 从 `notes.json` 提取已测评的 `tool_slug`
3. 找出差集 → 缺少测评的工具
4. 按 `featured` 优先、`stars` 降序排列
5. 选取前 3 个作为本轮目标

**compare 模式**：
1. 按 `category` 分组
2. 在同 category 内找 pair：
   - 不同 `pricing_tier`（免费 vs 付费）
   - 或不同 `work_mode`（IDE vs CLI）
   - 或不同 `difficulty`（入门 vs 专家）
3. 选出 2 对最有对比价值的 pair

**update 模式**：
1. 找到 `date` 早于 3 个月前的测评
2. 对每个测评，WebFetch 工具官网看是否有重大更新（新版本、新定价、新功能）
3. 有重大更新的优先

**single 模式**：
- 从 `tools.json` 找到 `--tool` 指定的 slug
- 提取该工具所有信息作为素材

### Step 3: 研究调研

对每个写作目标：
```
WebFetch(url=工具官网, prompt="提取：核心功能、定价方案、最新版本更新、目标用户、技术架构特点")
WebSearch: "<工具名> review experience 2026"
WebSearch: "<工具名> vs <竞品> comparison"
```

收集素材：
- 工具的核心功能和独特卖点
- 真实用户的评价和痛点
- 定价和版本变化
- 与同类工具的差异

### Step 4: 生成测评内容

按 `notes.json` schema 生成：

```json
{
  "slug": "kebab-case-descriptive-slug",
  "title": "有吸引力的中文标题（15-25字）",
  "date": "YYYY-MM-DD",
  "tool_slug": "对应工具的slug",
  "author": "AI Coding Nav 实测",
  "excerpt": "一句话摘要，60字以内，包含核心结论",
  "content": "Markdown 正文（见下方结构）",
  "tags": ["分类标签", "测评类型"]
}
```

**content 必须包含的结构**：

```markdown
## 为什么关注 {工具名}
{1-2段介绍背景、工具定位、为什么值得测评}

## 上手体验
{如何开始使用、安装/注册流程、第一印象}

## 实测场景一：{具体场景名}
{描述一个具体的编码场景和工具的表现}

## 实测场景二：{具体场景名}
{同上}

## 实测场景三：{具体场景名}
{同上}

## 优点总结
- {优点1}
- {优点2}
- {优点3}
- {优点4}

## 不足之处
- {缺点1}
- {缺点2}
- {缺点3}

## 适合谁用
{描述最适合的用户画像}

## 不适合谁用
{描述不适合的用户画像}

## 同类对比
{如果是对比测评，加上对比表格}

## 总结
{2-3句话的最终结论}
```

**写作要求**：
- 内容 800-2000 字
- 中文流畅自然，避免机翻感
- 具体而非泛泛而谈（"响应速度很快" → "修改 200 行代码后，3 秒内完成重构"）
- 包含真实的数据和版本号
- 不伪装成真人——末尾保留 "*(内容由AI辅助生成，人工审核)*"

### Step 5: 写入 notes.json

追加新测评到 `data/notes.json` 数组末尾。确保 `slug` 在 `published` 列表中不重复。

### Step 6: 验证

```bash
node scripts/verify-build.js
```
确保 18 项检查通过。

### Step 7: 更新状态

更新 `.claude/skills/state/reviewer-state.json`：
- 追加 `published` 列表
- 如果来自 scout 队列，从 `drafts` 移除
- 更新 `needsUpdate` 列表（update 模式）
- 更新 `lastRun`、递增 `totalRuns`
- 追加 `runs` 运行记录

---

## 输出产物
1. `data/notes.json` — 追加新测评条目
2. `.claude/skills/state/reviewer-state.json` — 状态更新

## 幂等性保证
- 写入前检查 `published` 数组，slug 重复自动跳过
- 同一 tool_slug 不产生两篇测评（除非是不同 mode 产生的不同角度，如普通测评 vs 对比测评）

## 质量检查清单
- [ ] slug 不与已有测评重复
- [ ] 标题 15-25 字
- [ ] excerpt ≤ 60 字
- [ ] content ≥ 800 字
- [ ] 包含 3 个实测场景
- [ ] 包含优点和缺点
- [ ] tool_slug 真实存在
- [ ] date 格式正确
- [ ] verify-build.js 通过

## 护栏提醒
- ⚠️ 只追加到 notes.json，不修改现有条目
- ⚠️ 不修改 tools.json
- ⚠️ 生成后必须运行 verify-build.js
