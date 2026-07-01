# AI Coding Nav 技能系统 — 安全护栏

## 编辑边界

### ✅ 允许写入
- `data/tools.json` — 追加新工具，更新现有工具字段
- `data/notes.json` — 追加新测评
- `data/link-failures.json` — 覆盖更新
- `output/*.md` — 写入报告和推广文案
- `.claude/skills/state/*.json` — 更新运行状态
- `.gitignore` — 首次添加 state/ 到忽略列表（仅一次）

### ❌ 禁止写入
- `app/` — 所有页面和组件源码
- `components/` — 所有 UI 组件
- `lib/` — 工具函数
- `public/` — 静态资源
- `scripts/` — 构建脚本
- `package.json` / `next.config.js` / `tailwind.config.js` / `tsconfig.json`

## 硬性规则（所有 skill 必须遵守）

1. **不删除** — 绝不删除 tools.json 中的现有条目，工具下线只标注不删除
2. **不修改源码** — 绝不修改 app/ components/ lib/ 目录下的任何文件
3. **不推送代码** — 绝不执行 git push 或修改 git 配置
4. **不改构建流程** — 绝不修改 package.json 的 scripts 或依赖
5. **并发限制** — HTTP 请求最多 5 个并发，间隔至少 2 秒
6. **搜索限制** — 每次运行最多 12 次 WebSearch
7. **完整字段** — 新工具 entry 必须填满至少 20/27 个字段才能入库
8. **变更验证** — 任何 data/ 修改后必须运行 `node scripts/verify-build.js`
9. **新链接验证** — 新增工具的 URL 必须经过可达性验证
10. **不碰密钥** — 绝不读取或修改 .env 文件、API key 配置

## 运行模式

| 模式 | 行为 |
|------|------|
| **默认模式** | 生成报告/候选，等待人工确认 |
| **--auto 模式** | 高分候选自动入库（需 >= 阈值） |

## 运行记录规范

每次运行结束，必须在 state 文件中记录：
```json
{
  "action": "做了什么",
  "tokensUsed": 估计值,
  "filesChanged": ["变更的文件列表"],
  "nextSuggested": "下次运行建议",
  "runAt": "ISO时间戳"
}
```
