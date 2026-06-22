"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import allTools from "@/data/tools.json";

type Tool = (typeof allTools)[number];

const categoryNames: Record<string, string> = {
  "ai-ide": "AI IDE",
  "agent-framework": "Agent框架",
  "mcp-tools": "MCP工具",
  "code-review": "代码审查",
  "testing-qa": "AI测试",
  "dev-tools": "开发工具",
};

function ComparePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tool1Slug, setTool1Slug] = useState(searchParams.get("tool1") || "");
  const [tool2Slug, setTool2Slug] = useState(searchParams.get("tool2") || "");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const tool1 = useMemo(
    () => allTools.find((t) => t.slug === tool1Slug) || null,
    [tool1Slug]
  );
  const tool2 = useMemo(
    () => allTools.find((t) => t.slug === tool2Slug) || null,
    [tool2Slug]
  );

  const filtered1 = useMemo(() => {
    if (!search1) return allTools;
    const q = search1.toLowerCase();
    return allTools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [search1]);

  const filtered2 = useMemo(() => {
    if (!search2) return allTools;
    const q = search2.toLowerCase();
    return allTools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [search2]);

  const updateUrl = (t1: string, t2: string) => {
    const params = new URLSearchParams();
    if (t1) params.set("tool1", t1);
    if (t2) params.set("tool2", t2);
    const qs = params.toString();
    router.replace(qs ? `/compare?${qs}` : "/compare", { scroll: false });
  };

  const selectTool1 = (slug: string) => {
    if (slug === tool2Slug) return;
    setTool1Slug(slug);
    setSearch1("");
    setOpen1(false);
    updateUrl(slug, tool2Slug);
  };

  const selectTool2 = (slug: string) => {
    if (slug === tool1Slug) return;
    setTool2Slug(slug);
    setSearch2("");
    setOpen2(false);
    updateUrl(tool1Slug, slug);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = () => {
      setOpen1(false);
      setOpen2(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const rows: { label: string; value1: string; value2: string }[] =
    tool1 && tool2
      ? [
          { label: "名称", value1: tool1.name, value2: tool2.name },
          {
            label: "分类",
            value1: categoryNames[tool1.category] || tool1.category,
            value2: categoryNames[tool2.category] || tool2.category,
          },
          {
            label: "一句话描述",
            value1: tool1.description,
            value2: tool2.description,
          },
          { label: "价格", value1: tool1.pricing, value2: tool2.pricing },
          {
            label: "GitHub Stars",
            value1: tool1.stars > 0 ? tool1.stars.toLocaleString() : "N/A",
            value2: tool2.stars > 0 ? tool2.stars.toLocaleString() : "N/A",
          },
          {
            label: "推荐理由",
            value1: tool1.pros?.slice(0, 3).join("；") || "暂无",
            value2: tool2.pros?.slice(0, 3).join("；") || "暂无",
          },
          {
            label: "官网链接",
            value1: tool1.url,
            value2: tool2.url,
          },
        ]
      : [];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                工具对比
              </h1>
              <p className="text-gray-400 text-base">
                并排对比，找到最适合你的 AI 编程工具
              </p>
            </div>

            {/* Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {/* Tool 1 */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  工具一
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={
                      open1
                        ? search1
                        : tool1
                        ? tool1.name
                        : search1
                    }
                    onChange={(e) => {
                      setSearch1(e.target.value);
                      setOpen1(true);
                    }}
                    onFocus={() => {
                      setSearch1("");
                      setOpen1(true);
                    }}
                    placeholder="搜索工具..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  {tool1 && !open1 && (
                    <button
                      onClick={() => {
                        setTool1Slug("");
                        setSearch1("");
                        updateUrl("", tool2Slug);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                {open1 && (
                  <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
                    {filtered1.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">无匹配工具</div>
                    ) : (
                      filtered1.map((t) => (
                        <button
                          key={t.slug}
                          onClick={() => selectTool1(t.slug)}
                          disabled={t.slug === tool2Slug}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                            t.slug === tool2Slug
                              ? "text-gray-600 cursor-not-allowed bg-gray-800/50"
                              : t.slug === tool1Slug
                              ? "text-primary-400 bg-primary-500/10"
                              : "text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          <span className="font-medium">{t.name}</span>
                          <span className="text-gray-500 ml-2 text-xs">
                            {categoryNames[t.category] || t.category}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Tool 2 */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  工具二
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={
                      open2
                        ? search2
                        : tool2
                        ? tool2.name
                        : search2
                    }
                    onChange={(e) => {
                      setSearch2(e.target.value);
                      setOpen2(true);
                    }}
                    onFocus={() => {
                      setSearch2("");
                      setOpen2(true);
                    }}
                    placeholder="搜索工具..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  {tool2 && !open2 && (
                    <button
                      onClick={() => {
                        setTool2Slug("");
                        setSearch2("");
                        updateUrl(tool1Slug, "");
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                {open2 && (
                  <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-xl bg-gray-800 border border-gray-700 shadow-xl">
                    {filtered2.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">无匹配工具</div>
                    ) : (
                      filtered2.map((t) => (
                        <button
                          key={t.slug}
                          onClick={() => selectTool2(t.slug)}
                          disabled={t.slug === tool1Slug}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                            t.slug === tool1Slug
                              ? "text-gray-600 cursor-not-allowed bg-gray-800/50"
                              : t.slug === tool2Slug
                              ? "text-primary-400 bg-primary-500/10"
                              : "text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          <span className="font-medium">{t.name}</span>
                          <span className="text-gray-500 ml-2 text-xs">
                            {categoryNames[t.category] || t.category}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Comparison Table or Empty State */}
            {tool1 && tool2 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium w-32">
                        属性
                      </th>
                      <th className="text-left py-3 px-4 text-white font-semibold">
                        {tool1.name}
                        {tool1.badge && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-primary-500/10 text-primary-300 border border-primary-500/20">
                            {tool1.badge}
                          </span>
                        )}
                      </th>
                      <th className="text-left py-3 px-4 text-white font-semibold">
                        {tool2.name}
                        {tool2.badge && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-primary-500/10 text-primary-300 border border-primary-500/20">
                            {tool2.badge}
                          </span>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-b border-gray-800 ${
                          i % 2 === 0 ? "bg-gray-800/20" : ""
                        }`}
                      >
                        <td className="py-3 px-4 text-gray-400 font-medium whitespace-nowrap">
                          {row.label}
                        </td>
                        <td className="py-3 px-4 text-gray-200">
                          {row.label === "官网链接" ? (
                            <a
                              href={row.value1}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-400 hover:text-primary-300 break-all"
                            >
                              {row.value1}
                            </a>
                          ) : (
                            row.value1
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-200">
                          {row.label === "官网链接" ? (
                            <a
                              href={row.value2}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-400 hover:text-primary-300 break-all"
                            >
                              {row.value2}
                            </a>
                          ) : (
                            row.value2
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">⚖️</div>
                <p className="text-gray-500 text-lg">选择两个工具开始对比</p>
                <p className="text-gray-600 text-sm mt-1">
                  在上方搜索框中搜索并选择工具
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="text-center mt-12 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm mb-3">
                还有更多工具？
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition-colors border border-gray-700"
              >
                返回首页浏览全部 {allTools.length} 个工具 →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function Compare() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <p className="text-gray-500">加载中...</p>
        </div>
      }
    >
      <ComparePage />
    </Suspense>
  );
}
