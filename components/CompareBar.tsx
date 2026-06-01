"use client";

interface CompareBarProps {
  comparedTools: Array<{
    slug: string;
    name: string;
    category: string;
    pricing: string;
    stars: number;
    pros?: string[];
    cons?: string[];
    tags: string[];
    description: string;
    url: string;
  }>;
  onRemove: (slug: string) => void;
  onClear: () => void;
  onClose: () => void;
}

const categoryNames: Record<string, string> = {
  "ai-ide": "AI IDE",
  "agent-framework": "Agent框架",
  "mcp-tools": "MCP工具",
  "code-review": "代码审查",
  "testing-qa": "AI测试",
  "dev-tools": "开发工具",
};

export default function CompareBar({ comparedTools, onRemove, onClear, onClose }: CompareBarProps) {
  if (comparedTools.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-white">对比工具 ({comparedTools.length}/4)</h3>
            {comparedTools.length >= 2 && (
              <span className="text-xs text-gray-500">可进行横向对比</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClear}
              className="px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              清空
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        {comparedTools.length >= 2 && (
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium w-24">对比项</th>
                  {comparedTools.map((t) => (
                    <th key={t.slug} className="text-left py-2 px-3 text-white font-medium min-w-[180px]">
                      <div className="flex items-center gap-1">
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-400">
                          {t.name}
                        </a>
                        <button onClick={() => onRemove(t.slug)} className="text-gray-600 hover:text-red-400">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="py-2 pr-4 text-gray-500">分类</td>
                  {comparedTools.map((t) => (
                    <td key={t.slug} className="py-2 px-3 text-gray-300">{categoryNames[t.category] || t.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-gray-500">定价</td>
                  {comparedTools.map((t) => (
                    <td key={t.slug} className="py-2 px-3 text-gray-300">{t.pricing}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-gray-500">Stars</td>
                  {comparedTools.map((t) => (
                    <td key={t.slug} className="py-2 px-3 text-gray-300">
                      {t.stars > 0 ? (t.stars >= 1000 ? `${(t.stars / 1000).toFixed(1)}k` : t.stars) : "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-gray-500">标签</td>
                  {comparedTools.map((t) => (
                    <td key={t.slug} className="py-2 px-3 text-gray-300">{t.tags.slice(0, 3).join(", ")}</td>
                  ))}
                </tr>
                {comparedTools.some((t) => t.pros?.length) && (
                  <tr>
                    <td className="py-2 pr-4 text-gray-500">优点</td>
                    {comparedTools.map((t) => (
                      <td key={t.slug} className="py-2 px-3">
                        <ul className="list-disc list-inside text-green-400 space-y-0.5">
                          {(t.pros || []).map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                )}
                {comparedTools.some((t) => t.cons?.length) && (
                  <tr>
                    <td className="py-2 pr-4 text-gray-500">缺点</td>
                    {comparedTools.map((t) => (
                      <td key={t.slug} className="py-2 px-3">
                        <ul className="list-disc list-inside text-red-400 space-y-0.5">
                          {(t.cons || []).map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                )}
                <tr>
                  <td className="py-2 pr-4 text-gray-500">简介</td>
                  {comparedTools.map((t) => (
                    <td key={t.slug} className="py-2 px-3 text-gray-400 leading-relaxed">{t.description}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Selected tools chips */}
        <div className="flex items-center gap-2">
          {comparedTools.map((t) => (
            <span key={t.slug} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-500/10 border border-primary-500/30 text-xs text-primary-300">
              {t.name}
              <button onClick={() => onRemove(t.slug)} className="hover:text-white">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          {comparedTools.length < 2 && (
            <span className="text-xs text-gray-500">再选 {2 - comparedTools.length} 个工具即可对比</span>
          )}
        </div>
      </div>
    </div>
  );
}
