# tools.json Entry Schema（27 字段）

## 数据文件位置
- 主数据：`data/tools.json` — 工具条目数组
- 结构：`[ { tool1 }, { tool2 }, ... ]`

## 所有字段

| # | 字段 | 类型 | 必填 | 示例 | 约束 |
|---|------|------|------|------|------|
| 1 | `slug` | string | ✅ | `"cursor"` | kebab-case，全站唯一 |
| 2 | `name` | string | ✅ | `"Cursor"` | 官方名称 |
| 3 | `description` | string | ✅ | `"AI-first..."` | 中文，一行，60字内 |
| 4 | `url` | string | ✅ | `"https://cursor.sh"` | https:// 开头 |
| 5 | `category` | string | ✅ | `"ai-ide"` | 见下方 valid 列表 |
| 6 | `pricing` | string | ✅ | `"免费 + Pro $20/月"` | 中文描述 |
| 7 | `tags` | string[] | ✅ | `["IDE","Agent"]` | 2~5 个标签 |
| 8 | `stars` | number | ✅ | `0` | GitHub Stars，无则 0 |
| 9 | `featured` | boolean | ✅ | `false` | 全站最多 8 个 |
| 10 | `pros` | string[] | ✅ | `["快速补全"]` | 3~5 条中文优势 |
| 11 | `cons` | string[] | ✅ | `["免费额度有限"]` | 2~4 条中文劣势 |
| 12 | `badge` | string/null | ❌ | `"🏆 综合最佳"` | 无则 null |
| 13 | `scenarios` | string[] | ✅ | `["IDE用户"]` | 推荐引擎匹配用 |
| 14 | `rec_tags` | string[] | ✅ | `["前端","全栈"]` | 推荐引擎匹配用 |
| 15 | `pricing_tier` | string | ✅ | `"freemium"` | 见下方 valid 列表 |
| 16 | `difficulty` | string | ✅ | `"intermediate"` | 见下方 valid 列表 |
| 17 | `best_for` | string | ✅ | `"追求最强AI..."` | 中文，一句话 |
| 18 | `not_for` | string | ✅ | `"偏好免费..."` | 中文，一句话 |
| 19 | `work_mode` | string | ✅ | `"ide"` | 见下方 valid 列表 |
| 20 | `added_date` | string | ✅ | `"2026-07-01"` | YYYY-MM-DD 格式 |

## Valid 枚举值

### category（6 个）
- `ai-ide` — AI IDE & 编辑器
- `agent-framework` — Agent 开发框架
- `mcp-tools` — MCP 工具 & 插件
- `code-review` — AI 代码审查
- `testing-qa` — AI 测试工具
- `dev-tools` — AI 开发工具

### pricing_tier（5 个）
- `free` — 完全免费
- `open-source` — 开源
- `freemium` — 有免费版
- `paid` — 付费
- `enterprise` — 企业版

### difficulty（3 个）
- `beginner` — 入门
- `intermediate` — 进阶
- `expert` — 专家

### work_mode（4 个）
- `ide` — IDE 插件
- `cli` — 命令行
- `web` — Web 应用
- `api` — API 接口

### badge（可选，6 种）
- `"🏆 综合最佳"`
- `"社区最爱"`
- `"最佳免费"`
- `"最佳平台"`
- `"必备工具"`
- `"命令行首选"`

## 新工具完整性检查清单

添加新工具前必须检查：
- [ ] slug 不与现有任何 slug 重复（大小写不敏感）
- [ ] url 是有效的 https:// 链接
- [ ] category 在 6 个有效值内
- [ ] pricing_tier 在 5 个有效值内
- [ ] difficulty 在 3 个有效值内
- [ ] work_mode 在 4 个有效值内
- [ ] pros 至少 3 条
- [ ] cons 至少 2 条
- [ ] best_for 和 not_for 已填写
- [ ] added_date 为今天日期
- [ ] featured 为 false（除非手动设为推荐）
- [ ] badge 为 null（除非手动授予）
