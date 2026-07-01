# link-doctor — 链接健康维护

## 概述
检查所有收录工具的链接可用性，对失效链接进行分类处理，修复可修复的 URL。
这是最基础的数据质量技能，包装已有的 `scripts/check-links.js`。

## 触发方式
在 Claude Code 中输入：`/link-doctor`

## 输入
- `data/tools.json` — 所有工具条目
- `.claude/skills/state/link-state.json` — 历史检查记录

## 引用文件
- `.claude/skills/_guardrails.md` — 必须遵守所有安全护栏
- `scripts/check-links.js` — 现有链接检查脚本

---

## 执行流程

### Step 1: 加载状态
```
Read .claude/skills/state/link-state.json
```
记录 `lastRun` 和 `persistentFails` 列表。

### Step 2: 运行链接检查
```bash
node scripts/check-links.js
```
这会自动产生：
- `data/link-failures.json` — 失效链接 slug 数组
- `output/link-check-report.md` — 详细报告

### Step 3: 分析失效链接
```
Read data/link-failures.json
Read output/link-check-report.md
```

对每个失效 slug 分类：

**分类规则**：
1. 对比 `link-state.json` 中的 `persistentFails`：
   - **新增失效**（不在历史中）→ 标记为 `new`，可能是临时错误
   - **持续失效**（出现在 ≥2 次历史中）→ 标记为 `actionable`，工具可能真挂了或换了域名
   - **已恢复**（在 `persistentFails` 中但本次通过）→ 标记为 `recovered`，从 `persistentFails` 移除

### Step 4: 修复 actionable 链接

对每个 `actionable` 失效：
```
WebSearch: "<工具中文名> official website 2026"
WebSearch: "<工具英文名> new url site:github.com"
```

**判断逻辑**：
1. 如果找到新 URL（不同域名但内容匹配）：
   - 更新 `data/tools.json` 中对应工具的 `url` 字段
   - 记录到 `urlFixes` 数组
2. 如果确认工具已下线（项目 archived / 域名过期 / 公司关闭）：
   - 不修改 tools.json（护栏规则：不删除）
   - 记录到 `persistentFails` 数组，标注 `"dead": true`
3. 如果无法确定（可能是临时错误）：
   - 保留在 `persistentFails` 等待下次检查
   - 标注 `"uncertain": true`

### Step 5: 生成增强报告

在 `output/link-check-report.md` 末尾追加分析摘要：

```markdown
## AI 分析摘要（{date}）

### 新增失效（{count}）
| 工具 | URL | 可能原因 |
|------|-----|---------|
| {name} | {url} | {reason} |

### 持续失效（{count}）
| 工具 | 失效次数 | 建议 |
|------|---------|------|
| {name} | {n}次 | {action} |

### 本次修复（{count}）
| 工具 | 旧 URL | 新 URL |
|------|--------|--------|
| {name} | {old} | {new} |

### 链接健康趋势
- 本次: {passed}/{total} 可用
- 上次: {prev_passed}/{prev_total} 可用
- 变化: {delta}
```

### Step 6: 更新状态
更新 `.claude/skills/state/link-state.json`：
- 追加 `history` 条目：`{ date, totalChecked, passed, failed, actionTaken }`
- 更新 `persistentFails` 列表
- 更新 `recovered` 列表
- 更新 `urlFixes` 列表
- 更新 `lastRun`、递增 `totalRuns`
- 追加 `runs` 运行记录

---

## 输出产物
1. `data/link-failures.json` — 自动更新（由 check-links.js 产生）
2. `output/link-check-report.md` — 自动更新 + AI 分析追加
3. `.claude/skills/state/link-state.json` — 状态更新

## 幂等性保证
- 同一天重复运行会覆盖当天的 history 条目（按日期去重）
- check-links.js 本身是幂等的（总是覆盖输出文件）
- URL 修复前检查是否已经是正确 URL（避免重复修改）

## 护栏提醒
- ⚠️ 只修改 tools.json 中的 `url` 字段，不改其他字段
- ⚠️ 绝不删除 tools.json 条目
- ⚠️ 修复后运行 `node scripts/verify-build.js` 验证
