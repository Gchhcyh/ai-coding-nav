"use client";

import Link from "next/link";

interface ToolCardProps {
  tool: {
    slug: string;
    name: string;
    description: string;
    url: string;
    category: string;
    pricing: string;
    tags: string[];
    stars: number;
    featured: boolean;
    pros?: string[];
    cons?: string[];
  };
  compareMode?: boolean;
  isCompared?: boolean;
  onToggleCompare?: (slug: string) => void;
}

const categoryColors: Record<string, string> = {
  "ai-ide": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "agent-framework": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "mcp-tools": "bg-green-500/10 text-green-400 border-green-500/20",
  "code-review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "testing-qa": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "dev-tools": "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const categoryNames: Record<string, string> = {
  "ai-ide": "AI IDE",
  "agent-framework": "Agent框架",
  "mcp-tools": "MCP工具",
  "code-review": "代码审查",
  "testing-qa": "AI测试",
  "dev-tools": "开发工具",
};

export default function ToolCard({ tool, compareMode, isCompared, onToggleCompare }: ToolCardProps) {
  const cardContent = (
    <div className="relative">
      {compareMode && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleCompare?.(tool.slug);
          }}
          className={`absolute top-2 right-2 z-10 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
            isCompared
              ? "bg-primary-500 border-primary-500 text-white"
              : "border-gray-600 bg-gray-800/50 text-transparent hover:border-gray-400"
          }`}
        >
          {isCompared && (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      )}

      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors pr-8">
          {tool.name}
          {tool.featured && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-600 text-white">
              精选
            </span>
          )}
        </h3>
        {tool.stars > 0 && (
          <span className="flex items-center gap-1 text-xs text-gray-500 shrink-0 ml-2">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {tool.stars >= 1000 ? `${(tool.stars / 1000).toFixed(1)}k` : tool.stars}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
        {tool.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${categoryColors[tool.category] || "bg-gray-700/50 text-gray-400 border-gray-600"}`}>
            {categoryNames[tool.category] || tool.category}
          </span>
          {tool.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-gray-700/50 text-gray-400 border border-gray-600">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-gray-500 shrink-0 ml-2">{tool.pricing}</span>
      </div>
    </div>
  );

  if (compareMode) {
    return (
      <div className={`block p-5 rounded-xl bg-gray-800/40 border transition-all ${
        isCompared
          ? "border-primary-500/50 ring-1 ring-primary-500/30"
          : "border-gray-700/50 hover:border-gray-600"
      }`}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 card-hover ${
        tool.featured ? "ring-1 ring-primary-500/30" : ""
      }`}
    >
      {cardContent}
    </Link>
  );
}
