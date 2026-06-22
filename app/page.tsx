"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ToolCard from "@/components/ToolCard";
import CompareBar from "@/components/CompareBar";
import Newsletter from "@/components/Newsletter";
import SponsorBanner from "@/components/SponsorBanner";
import Footer from "@/components/Footer";
import { categories } from "@/lib/tools";
import allTools from "@/data/tools.json";

type Tool = (typeof allTools)[number];

function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchResults, setSearchResults] = useState(allTools);

  // Multi-filters
  const [priceFilter, setPriceFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [workModeFilter, setWorkModeFilter] = useState("all");

  // Keep activeCategory in sync with URL searchParams
  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedSlugs, setComparedSlugs] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState<'default' | 'stars' | 'name-asc' | 'name-desc'>('default');

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/", { scroll: false });
  };

  const filteredTools = useMemo(() => {
    let result = activeCategory
      ? searchResults.filter((t) => t.category === activeCategory)
      : searchResults;

    // Price filter
    if (priceFilter !== "all") {
      result = result.filter((t: any) => {
        const tier = t.pricing_tier || "freemium";
        if (priceFilter === "free") return tier === "free" || tier === "open-source";
        if (priceFilter === "freemium") return tier === "freemium";
        if (priceFilter === "paid") return tier === "paid" || tier === "enterprise";
        return true;
      });
    }

    // Difficulty filter
    if (difficultyFilter !== "all") {
      result = result.filter((t: any) => (t.difficulty || "intermediate") === difficultyFilter);
    }

    // Work mode filter
    if (workModeFilter !== "all") {
      result = result.filter((t: any) => (t.work_mode || "web") === workModeFilter);
    }

    switch (sortBy) {
      case 'stars':
        return [...result].sort((a, b) => (b.stars || 0) - (a.stars || 0));
      case 'name-asc':
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...result].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return result;
    }
  }, [activeCategory, searchResults, sortBy, priceFilter, difficultyFilter, workModeFilter]);

  const featuredTools = allTools.filter((t) => t.featured);
  const activeCategoryData = categories.find((c) => c.id === activeCategory);
  const comparedTools = allTools.filter((t) => comparedSlugs.includes(t.slug));

  const toggleCompare = (slug: string) => {
    setComparedSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  };

  const clearCompare = () => setComparedSlugs([]);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              AI 编程工具
              <span className="gradient-text"> 全链路导航</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg mb-2 max-w-2xl mx-auto">
              覆盖 AI IDE、Agent 框架、MCP 工具、代码审查、测试工具、开发辅助 ——
            </p>
            <p className="text-gray-500 text-sm mb-6">
              从写第一行代码到部署上线，一站找齐所有 AI 开发工具
            </p>

            <SearchBar tools={allTools} onResults={setSearchResults} />

            {/* Action bar */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => {
                  setCompareMode(!compareMode);
                  if (!compareMode) setComparedSlugs([]);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  compareMode
                    ? "bg-primary-600 text-white"
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                <span className="mr-1.5">📊</span>
                {compareMode ? "退出对比" : "对比模式"}
              </button>
              {compareMode && (
                <span className="text-xs text-gray-500">
                  点击工具卡片上的方框选择，最多选 4 个
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8 text-sm text-gray-500">
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">{allTools.length}</span>
                收录工具
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">{categories.length}</span>
                分类
              </div>
              <div className="text-center">
                <span className="block text-2xl font-bold text-white">每周</span>
                更新
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Filter Bar */}
        <section className="pb-2 px-4">
          <div className="max-w-7xl mx-auto space-y-2">
            {/* Price */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500 w-10 shrink-0">价格</span>
              {[
                { value: "all", label: "全部" },
                { value: "free", label: "免费" },
                { value: "freemium", label: "有免费版" },
                { value: "paid", label: "付费" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPriceFilter(opt.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    priceFilter === opt.value
                      ? "bg-primary-600 text-white"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {/* Difficulty */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500 w-10 shrink-0">难度</span>
              {[
                { value: "all", label: "全部" },
                { value: "beginner", label: "入门" },
                { value: "intermediate", label: "进阶" },
                { value: "expert", label: "专家" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDifficultyFilter(opt.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    difficultyFilter === opt.value
                      ? "bg-primary-600 text-white"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {/* Work Mode */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500 w-10 shrink-0">方式</span>
              {[
                { value: "all", label: "全部" },
                { value: "ide", label: "IDE插件" },
                { value: "cli", label: "命令行" },
                { value: "web", label: "Web应用" },
                { value: "api", label: "API接口" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setWorkModeFilter(opt.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    workModeFilter === opt.value
                      ? "bg-primary-600 text-white"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recommend Entry Card */}
        <section className="pb-4 px-4">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/recommend"
              className="block p-5 rounded-xl bg-gradient-to-r from-purple-900/20 to-primary-900/20 border border-purple-800/30 hover:border-purple-700/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors">
                    不确定用哪个？
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    花 30 秒回答 3 个问题，帮你精准匹配
                  </p>
                </div>
                <span className="shrink-0 px-4 py-2 rounded-lg bg-purple-600/20 text-purple-400 text-sm font-medium group-hover:bg-purple-600/30 transition-colors">
                  开始推荐 →
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">排序:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-gray-300 text-sm focus:outline-none focus:border-primary-500"
              >
                <option value="default">默认</option>
                <option value="stars">Star 数</option>
                <option value="name-asc">名称 A-Z</option>
                <option value="name-desc">名称 Z-A</option>
              </select>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            {activeCategoryData && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{activeCategoryData.icon}</span>
                  {activeCategoryData.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{activeCategoryData.description}</p>
              </div>
            )}

            {/* Featured Section - 本周推荐 */}
            {!activeCategory && searchResults.length === allTools.length && featuredTools.length > 0 && (
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-amber-400">&#9733;</span> 本周推荐
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
                  {featuredTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="shrink-0 w-72 p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:border-primary-500/40 transition-all group"
                    >
                      {tool.badge && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-100 border border-amber-500/40 mb-2">
                          <svg className="w-3 h-3 text-amber-300" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4.5 14H11L8 22L19.5 10H13L16 2H13Z"/></svg>
                          {tool.badge}
                        </span>
                      )}
                      <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{tool.description}</p>
                      {tool.stars > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          {tool.stars >= 1000 ? `${(tool.stars / 1000).toFixed(1)}k` : tool.stars} Stars
                        </div>
                      )}
                      {(tool as any).best_for && (
                        <p className="text-[10px] text-gray-500 mt-1.5 line-clamp-1">{(tool as any).best_for}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All / Filtered Tools */}
            <div>
              {!activeCategory && searchResults.length === allTools.length && (
                <h2 className="text-lg font-semibold text-white mb-4">全部工具</h2>
              )}
              {!activeCategory && (
                <SponsorBanner slot="list-top" className="mb-6" />
              )}
              {filteredTools.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">没有匹配的工具</p>
                  <p className="text-gray-600 text-sm mt-2">试试换个搜索词或放宽筛选条件</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.slug}
                      tool={tool}
                      compareMode={compareMode}
                      isCompared={comparedSlugs.includes(tool.slug)}
                      onToggleCompare={toggleCompare}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />

        {/* Submit CTA */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary-900/30 to-purple-900/30 border border-primary-800/30">
              <h3 className="text-lg font-semibold text-white mb-2">有遗漏的好工具？</h3>
              <p className="text-sm text-gray-400 mb-4">在 GitHub 提交 Issue，我们会在 24 小时内收录</p>
              <a
                href="https://github.com/Gchhcyh/ai-coding-nav/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub 提交工具
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Compare Bar */}
      <CompareBar
        comparedTools={comparedTools}
        onRemove={toggleCompare}
        onClear={clearCompare}
        onClose={() => {
          setCompareMode(false);
          clearCompare();
        }}
      />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <HomePage />
    </Suspense>
  );
}
