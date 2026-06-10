import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export function generateStaticParams() {
  return allTools.map((tool) => ({ slug: tool.slug }));
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = allTools.find((t) => t.slug === params.slug);
  if (!tool) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </Link>

          <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{tool.name}</h1>
              {tool.featured && (
                <span className="px-2 py-1 rounded text-xs font-bold bg-primary-600 text-white shrink-0">精选</span>
              )}
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-6">{tool.description}</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-20">分类</span>
                <span className={`px-2.5 py-1 rounded text-xs font-medium border ${categoryColors[tool.category] || "bg-gray-700/50 text-gray-400 border-gray-600"}`}>
                  {categoryMap[tool.category] || tool.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-20">定价</span>
                <span className="text-sm text-gray-300">{tool.pricing}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-20">标签</span>
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs bg-gray-700/50 text-gray-400 border border-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {tool.stars > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 w-20">GitHub</span>
                  <span className="flex items-center gap-1 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {tool.stars.toLocaleString()} Stars
                  </span>
                </div>
              )}
            </div>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-colors"
            >
              访问官网
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
