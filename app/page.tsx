"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
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
  }, [activeCategory, searchResults, sortBy]);

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

            {/* Featured Section */}
            {!activeCategory && searchResults.length === allTools.length && (
              <div className="mb-10">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>⭐</span> 精选推荐
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featuredTools.map((tool) => (
                    <ToolCard
                      key={tool.slug}
                      tool={tool}
                      compareMode={compareMode}
                      isCompared={comparedSlugs.includes(tool.slug)}
                      onToggleCompare={toggleCompare}
                    />
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
                  <p className="text-gray-500 text-lg">没有找到匹配的工具</p>
                  <p className="text-gray-600 text-sm mt-2">试试换个搜索词或分类</p>
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
