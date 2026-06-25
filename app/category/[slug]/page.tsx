import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import allTools from "@/data/tools.json";
import { categories, categoryMap } from "@/lib/tools";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const catName = categoryMap[params.slug];
  if (!catName) {
    return { title: "分类未找到 - AI Coding Nav" };
  }
  return {
    title: `${catName} - AI编程工具导航 | AI Coding Nav`,
    description: `2026年最新${catName}合集：收录${catName}领域的AI编程工具，含对比评测、优缺点分析和真实使用体验。`,
    openGraph: {
      title: `${catName} - AI编程工具导航 | AI Coding Nav`,
      description: `2026年最新${catName}合集：收录${catName}领域的AI编程工具，含对比评测、优缺点分析和真实使用体验。`,
    },
  };
}

const categoryColors: Record<string, string> = {
  "ai-ide": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "agent-framework": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "mcp-tools": "bg-green-500/10 text-green-400 border-green-500/20",
  "code-review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "testing-qa": "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "dev-tools": "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const catName = categoryMap[params.slug];
  const tools = allTools.filter((t: any) => t.category === params.slug);
  const cat = categories.find((c) => c.id === params.slug);

  return (
    <>
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              首页
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-300">{catName}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {cat?.icon && <span className="mr-2">{cat.icon}</span>}
              {catName}
            </h1>
            <p className="text-gray-400 text-sm">
              {cat?.description || `收录 ${tools.length} 个工具`}
            </p>
            <p className="text-gray-500 text-xs mt-1">共 {tools.length} 个工具</p>
          </div>

          {/* Tool Grid */}
          {tools.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">该分类下暂无工具</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool: any) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="block p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:border-primary-500/40 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {tool.name}
                    </h3>
                    {tool.badge && (
                      <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-100 border border-amber-500/40">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">{tool.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-gray-500">{tool.pricing}</span>
                    {tool.featured && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-600 text-white">
                        精选
                      </span>
                    )}
                    {tool.tags?.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-gray-700/50 text-gray-400 border border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Back link */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              &#8592; 返回首页浏览所有分类
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
