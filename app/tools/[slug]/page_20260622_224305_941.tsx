"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolDetailList from "@/components/ToolDetailList";
import allTools from "@/data/tools.json";
import { categoryMap } from "@/lib/tools";

const categoryColors: Record<string, string> = {
  "ai-ide": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "agent-framework": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "mcp-tools": "bg-green-500/10 text-green-400 border-green-500/20",
  "code-review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "testing-qa": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "dev-tools": "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const pricingTierLabels: Record<string, string> = {
  "free": "免费",
  "freemium": "有免费版",
  "paid": "付费",
  "open-source": "开源免费",
  "enterprise": "企业版",
};

const difficultyLabels: Record<string, string> = {
  "beginner": "入门",
  "intermediate": "进阶",
  "expert": "专家",
};

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = allTools.find((t: any) => t.slug === params.slug);
  if (!tool) notFound();

  const sameCategoryTools = allTools.filter(
    (t: any) => t.category === tool.category && t.slug !== tool.slug && t.badge
  );

  return (
    <>
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>

          <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{tool.name}</h1>
                <span className={`px-2.5 py-1 rounded text-xs font-medium border ${categoryColors[tool.category] || "bg-gray-700/50 text-gray-400 border-gray-600"}`}>
                  {categoryMap[tool.category] || tool.category}
                </span>
                {tool.badge && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-100 border border-amber-500/40">
                    <svg className="w-3 h-3 text-amber-300" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4.5 14H11L8 22L19.5 10H13L16 2H13Z"/></svg>
                    {tool.badge}
                  </span>
                )}
              </div>
              {tool.featured && (
                <span className="px-2 py-1 rounded text-xs font-bold bg-primary-600 text-white shrink-0">精选</span>
              )}
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-4">{tool.description}</p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-sm text-gray-300">{tool.pricing}</span>
              {(tool as any).pricing_tier && (
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-700/50 text-gray-400 border border-gray-600">
                  {pricingTierLabels[(tool as any).pricing_tier] || (tool as any).pricing_tier}
                </span>
              )}
              {(tool as any).difficulty && (
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-700/50 text-gray-400 border border-gray-600">
                  难度: {difficultyLabels[(tool as any).difficulty] || (tool as any).difficulty}
                </span>
              )}
            </div>

            {tool.stars > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="text-sm text-gray-300">{tool.stars.toLocaleString()} GitHub Stars</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-8">
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors text-sm">
                访问官网
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
              <Link href={`/compare?tool=${tool.slug}`} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 font-medium transition-colors text-sm border border-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                加入对比
              </Link>
            </div>

            {tool.pros && tool.pros.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  优点
                </h3>
                <ul className="space-y-2">
                  {tool.pros.map((pro: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-green-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tool.cons && tool.cons.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
                  缺点
                </h3>
                <ul className="space-y-2">
                  {tool.cons.map((con: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01"/></svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <ToolDetailList best_for={(tool as any).best_for} not_for={(tool as any).not_for} />
            </div>

            {tool.tags && tool.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">标签</h3>
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag: string) => (
                    <span key={tag} className="px-2.5 py-1 rounded text-xs bg-gray-700/50 text-gray-400 border border-gray-600">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {sameCategoryTools.length > 0 && (
            <div className="mt-8">
              <h3 className="text-base font-semibold text-white mb-4">同类工具推荐</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sameCategoryTools.slice(0, 6).map((t: any) => (
                  <Link key={t.slug} href={`/tools/${t.slug}`} className="block p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{t.name}</span>
                      {t.badge && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">{t.badge}</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{t.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link href="/recommend" className="block p-5 rounded-xl bg-gradient-to-r from-purple-900/20 to-primary-900/20 border border-purple-800/30 hover:border-purple-700/50 transition-all group text-center">
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                还没决定？试试场景推荐，帮你精准匹配 →
              </p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
