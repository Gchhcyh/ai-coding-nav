"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import allTools from "@/data/tools.json";
import { categories } from "@/lib/tools";

export default function AnalyticsPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Only allow access in development or with a secret query param
    const isDev = typeof window !== "undefined" && window.location.hostname === "localhost";
    const hasKey = typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("key") === "marvis2026";
    if (!isDev && !hasKey) {
      router.replace("/");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    if (!authorized) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 400;
    const h = 280;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);

    const categoryCounts = categories.map((cat) => ({
      name: cat.name,
      count: allTools.filter((t: any) => t.category === cat.id).length,
    }));

    const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#14B8A6", "#F97316"];
    const total = categoryCounts.reduce((s, c) => s + c.count, 0);

    let startAngle = -Math.PI / 2;
    const cx = 140;
    const cy = 140;
    const radius = 100;

    categoryCounts.forEach((item, i) => {
      const sliceAngle = (item.count / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();

      // Label
      const mid = startAngle + sliceAngle / 2;
      const lx = cx + Math.cos(mid) * (radius + 30);
      const ly = cy + Math.sin(mid) * (radius + 30);
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "10px sans-serif";
      ctx.textAlign = mid < Math.PI / 2 || mid > -Math.PI / 2 ? "left" : "right";
      ctx.fillText(`${item.count}`, lx, ly);

      startAngle += sliceAngle;
    });

    // Legend
    const legendX = 300;
    categoryCounts.forEach((item, i) => {
      const y = 60 + i * 36;
      ctx.fillStyle = colors[i];
      ctx.fillRect(legendX, y, 12, 12);
      ctx.fillStyle = "#D1D5DB";
      ctx.font = "11px sans-serif";
      ctx.fillText(`${item.name} (${item.count})`, legendX + 18, y + 10);
    });
  }, [authorized]);

  if (!authorized) return null;

  const totalTools = allTools.length;

  const pricingCounts: Record<string, number> = {};
  allTools.forEach((t: any) => {
    const p = t.pricing || "未知";
    pricingCounts[p] = (pricingCounts[p] || 0) + 1;
  });

  const badgeTools = allTools.filter((t: any) => t.badge).length;

  const recentTools = [...allTools]
    .sort((a: any, b: any) => {
      const aId = parseInt((a as any).file_id || "0");
      const bId = parseInt((b as any).file_id || "0");
      return bId - aId;
    })
    .slice(0, 10);

  return (
    <>
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Analytics Dashboard
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50">
              <p className="text-xs text-gray-500 mb-1">总工具数</p>
              <p className="text-3xl font-bold text-white">{totalTools}</p>
            </div>
            <div className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50">
              <p className="text-xs text-gray-500 mb-1">分类数</p>
              <p className="text-3xl font-bold text-white">{categories.length}</p>
            </div>
            <div className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50">
              <p className="text-xs text-gray-500 mb-1">Badge工具</p>
              <p className="text-3xl font-bold text-amber-400">{badgeTools}</p>
            </div>
            <div className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50">
              <p className="text-xs text-gray-500 mb-1">精选工具</p>
              <p className="text-3xl font-bold text-primary-400">
                {allTools.filter((t: any) => t.featured).length}
              </p>
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="mb-10 p-6 rounded-xl bg-gray-800/40 border border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">分类分布</h2>
            <div className="flex justify-center">
              <canvas ref={canvasRef} />
            </div>
          </div>

          {/* Pricing Distribution */}
          <div className="mb-10 p-6 rounded-xl bg-gray-800/40 border border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">定价模式分布</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(pricingCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([pricing, count]) => (
                  <div
                    key={pricing}
                    className="p-4 rounded-lg bg-gray-700/30 border border-gray-600/30 text-center"
                  >
                    <p className="text-2xl font-bold text-white">{count}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate" title={pricing}>
                      {pricing}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Tools */}
          <div className="p-6 rounded-xl bg-gray-800/40 border border-gray-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">最近添加的工具（按 ID）</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-700">
                    <th className="pb-2 font-medium">名称</th>
                    <th className="pb-2 font-medium">分类</th>
                    <th className="pb-2 font-medium">定价</th>
                    <th className="pb-2 font-medium">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTools.map((tool: any) => (
                    <tr key={tool.slug} className="border-b border-gray-800/50">
                      <td className="py-2 text-gray-300">{tool.name}</td>
                      <td className="py-2 text-gray-500 text-xs">
                        {(categories.find((c) => c.id === tool.category)?.name || tool.category).slice(0, 12)}
                      </td>
                      <td className="py-2 text-gray-500 text-xs">{tool.pricing}</td>
                      <td className="py-2">
                        {tool.badge ? (
                          <span className="text-xs text-amber-400">{tool.badge}</span>
                        ) : (
                          <span className="text-xs text-gray-600">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
