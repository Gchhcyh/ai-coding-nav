"use client";

import { useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import allTools from "@/data/tools.json";

type ToolWithDate = (typeof allTools)[number] & {
  added_date?: string;
};

export default function ChangelogPage() {
  const toolsWithDate = useMemo(() => {
    const items = (allTools as ToolWithDate[])
      .filter((t) => t.added_date)
      .sort((a, b) => {
        if (a.added_date! > b.added_date!) return -1;
        if (a.added_date! < b.added_date!) return 1;
        return 0;
      });

    // Group by month (YYYY-MM)
    const grouped: Record<string, ToolWithDate[]> = {};
    for (const t of items) {
      const month = t.added_date!.slice(0, 7); // "2026-06"
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(t);
    }
    return grouped;
  }, []);

  const monthNames: Record<string, string> = {
    "01": "1月", "02": "2月", "03": "3月", "04": "4月",
    "05": "5月", "06": "6月", "07": "7月", "08": "8月",
    "09": "9月", "10": "10月", "11": "11月", "12": "12月",
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              更新时间线
            </h1>
            <p className="text-gray-400 text-sm mb-10">
              记录每一次工具收录和重要更新
            </p>

            {Object.keys(toolsWithDate).length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">暂无更新记录</p>
              </div>
            ) : (
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-800" />

                {Object.entries(toolsWithDate).map(([month, tools]) => {
                  const [year, m] = month.split("-");
                  const monthLabel = `${year}年${monthNames[m] || m}`;

                  return (
                    <div key={month} className="mb-10 last:mb-0">
                      {/* Timeline dot + month header */}
                      <div className="flex items-center gap-3 -ml-8 mb-4">
                        <div className="w-6 h-6 rounded-full bg-primary-600 border-4 border-gray-950 shrink-0" />
                        <h2 className="text-lg font-semibold text-white">{monthLabel}</h2>
                        <span className="text-xs text-gray-600">{tools.length} 个工具</span>
                      </div>

                      {/* Tool cards */}
                      <div className="space-y-3">
                        {tools.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={`/tools/${tool.slug}`}
                            className="block p-4 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-primary-500/30 transition-all group"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">
                                    {tool.name}
                                  </h3>
                                  {tool.badge && (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                      {tool.badge}
                                    </span>
                                  )}
                                  {tool.featured && (
                                    <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-600 text-white">
                                      精选
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400 mt-1 line-clamp-1">{tool.description}</p>
                              </div>
                              {tool.category && (
                                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] bg-gray-700/50 text-gray-400 border border-gray-600">
                                  {tool.category}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
