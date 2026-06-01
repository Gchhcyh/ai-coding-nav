"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-primary-950/50 to-purple-950/50 border border-primary-800/30">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-medium text-primary-400 mb-6">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          每周 AI 工具速递
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          不错过下一个好工具
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
          每周精选 5 个 AI 编程工具，附带实战测评和使用技巧，助你保持技术前沿。
        </p>

        {submitted ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 text-green-400 mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">订阅成功</span>
            </div>
            <p className="text-sm text-gray-500">下周你会收到第一封邮件</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium transition-colors shrink-0"
            >
              订阅
            </button>
          </form>
        )}

        <p className="text-xs text-gray-600 mt-4">
          不发送垃圾邮件，随时一键退订
        </p>
      </div>
    </section>
  );
}
