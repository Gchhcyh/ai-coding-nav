"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import allTools from "@/data/tools.json";

type Tool = (typeof allTools)[number];

type Answer =
  | "前端"
  | "后端"
  | "全栈"
  | "AI应用"
  | "免费"
  | "功能最强"
  | "社区大"
  | "上手快"
  | "IDE用户"
  | "命令行"
  | "轻量快速";

const questions = [
  {
    step: 1,
    title: "你主要写什么？",
    options: [
      { label: "前端", desc: "React / Vue / CSS 等", icon: "🎨" },
      { label: "后端", desc: "API / 数据库 / 微服务", icon: "⚙️" },
      { label: "全栈", desc: "前后端都写", icon: "🔧" },
      { label: "AI应用开发", desc: "LLM应用 / Agent / RAG", icon: "🤖" },
    ],
    key: "domain" as const,
  },
  {
    step: 2,
    title: "你更看重什么？",
    options: [
      { label: "免费省钱", desc: "开源或免费优先", icon: "💰" },
      { label: "功能最强", desc: "能力最顶尖", icon: "🚀" },
      { label: "社区大生态好", desc: "用户多、插件多", icon: "👥" },
      { label: "上手快零门槛", desc: "开箱即用", icon: "✨" },
    ],
    key: "priority" as const,
  },
  {
    step: 3,
    title: "你的工作方式？",
    options: [
      { label: "IDE 深度用户", desc: "VS Code / JetBrains", icon: "💻" },
      { label: "命令行终端", desc: "CLI / Git 工作流", icon: "⌨️" },
      { label: "轻量快速即可", desc: "简单够用就行", icon: "⚡" },
    ],
    key: "workstyle" as const,
  },
];

const rankEmojis = ["🥇", "🥈", "🥉"];

export default function RecommendPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    if (step < 3) {
      setStep(step + 1);
    }
    // step === 3 means we've completed the last question, stay there
    if (step === 2) {
      // Just finished step 3, trigger results
    }
  };

  const results = useMemo(() => {
    if (step < 3) return [];
    const domain = answers["domain"];
    const priority = answers["priority"];
    const workstyle = answers["workstyle"];

    // Map answers to matching keys
    const priorityMap: Record<string, string> = {
      "免费省钱": "免费",
      "功能最强": "功能最强",
      "社区大生态好": "社区大",
      "上手快零门槛": "上手快",
    };
    const workstyleMap: Record<string, string> = {
      "IDE 深度用户": "IDE用户",
      "命令行终端": "命令行",
      "轻量快速即可": "轻量快速",
    };

    const pKey = priorityMap[priority] || priority;
    const wKey = workstyleMap[workstyle] || workstyle;

    const scored = allTools
      .filter((t) => t.rec_tags || t.scenarios)
      .map((t) => {
        let score = 0;
        // rec_tags match domain: 3 points
        if (t.rec_tags && t.rec_tags.includes(domain)) score += 3;
        // scenarios match priority: 2 points
        if (t.scenarios && t.scenarios.includes(pKey)) score += 2;
        // scenarios match workstyle: 2 points
        if (t.scenarios && t.scenarios.includes(wKey)) score += 2;
        return { tool: t, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return scored;
  }, [step, answers]);

  const generateReason = (
    tool: Tool,
    domain: string,
    priority: string,
    workstyle: string
  ): string => {
    const reasons: string[] = [];
    if (tool.rec_tags?.includes(domain)) {
      reasons.push(`专注${domain}开发场景`);
    }
    if (tool.scenarios?.includes("免费")) reasons.push("完全免费开源");
    if (tool.scenarios?.includes("功能最强")) reasons.push("功能业界顶尖");
    if (tool.scenarios?.includes("社区大")) reasons.push("社区生态庞大");
    if (tool.scenarios?.includes("上手快")) reasons.push("上手简单快速");
    if (tool.scenarios?.includes("IDE用户")) reasons.push("深度集成IDE");
    if (tool.scenarios?.includes("命令行")) reasons.push("命令行原生体验");
    if (tool.scenarios?.includes("轻量快速"))
      reasons.push("轻量级，启动快");

    return reasons.slice(0, 3).join("，") || "综合匹配度高";
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                场景推荐
              </h1>
              <p className="text-gray-400 text-base">
                回答 3 个问题，帮你选到最合适的工具
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step + 1 >= n
                      ? "bg-primary-600 text-white"
                      : "bg-gray-800 text-gray-600"
                  }`}
                >
                  {step + 1 > n ? "✓" : n}
                </div>
              ))}
            </div>

            {/* Question or Results */}
            {step < 3 ? (
              <div className="animate-slide-up">
                <h2 className="text-xl font-semibold text-white text-center mb-6">
                  {questions[step].title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() =>
                        handleSelect(questions[step].key, opt.label)
                      }
                      className="flex items-start gap-4 p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:border-primary-500/50 hover:bg-gray-800/70 transition-all text-left group"
                    >
                      <span className="text-2xl shrink-0">{opt.icon}</span>
                      <div>
                        <div className="font-medium text-white group-hover:text-primary-400 transition-colors">
                          {opt.label}
                        </div>
                        <div className="text-sm text-gray-500 mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-slide-up">
                <h2 className="text-xl font-semibold text-white text-center mb-2">
                  你的专属推荐
                </h2>
                <p className="text-gray-500 text-sm text-center mb-8">
                  根据你的偏好，以下是 Top 3 最适合的工具
                </p>

                {results.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">暂未找到完全匹配的工具</p>
                    <button
                      onClick={reset}
                      className="mt-4 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm transition-colors"
                    >
                      重新测试
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.map((r, i) => (
                      <div
                        key={r.tool.slug}
                        className="p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:border-gray-600 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-2xl shrink-0">
                            {rankEmojis[i]}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="text-lg font-semibold text-white">
                                {r.tool.name}
                              </h3>
                              {r.tool.badge && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-primary-500/10 text-primary-300 border border-primary-500/20">
                                  {r.tool.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 mb-2">
                              {r.tool.description}
                            </p>
                            <p className="text-sm text-primary-400 mb-3">
                              推荐理由：{generateReason(
                                r.tool,
                                answers["domain"],
                                answers["priority"],
                                answers["workstyle"]
                              )}
                            </p>
                            <div className="flex items-center gap-3 flex-wrap">
                              {r.tool.rec_tags?.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded text-[11px] bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                >
                                  {tag}
                                </span>
                              ))}
                              <a
                                href={r.tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-auto text-sm text-primary-400 hover:text-primary-300 font-medium shrink-0"
                              >
                                直达链接 →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reset button */}
                <div className="text-center mt-8">
                  <button
                    onClick={reset}
                    className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition-colors border border-gray-700"
                  >
                    重新测试
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
