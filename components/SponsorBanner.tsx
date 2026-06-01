"use client";

interface SponsorBannerProps {
  slot: "list-top" | "sidebar";
  className?: string;
}

export default function SponsorBanner({ slot, className = "" }: SponsorBannerProps) {
  const slots = {
    "list-top": {
      title: "在此推广你的 AI 工具",
      desc: "覆盖 10,000+ 开发者，月 PV 50,000+",
      cta: "广告合作 →",
      href: "mailto:sponsor@aicodingnav.com",
    },
    sidebar: {
      title: "赞助位",
      desc: "你的工具放这里 — $199/月",
      cta: "了解详情",
      href: "mailto:sponsor@aicodingnav.com",
    },
  };

  const s = slots[slot];

  return (
    <div className={`rounded-xl p-4 border border-dashed border-primary-500/30 bg-gradient-to-r from-primary-950/40 to-purple-950/40 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-300">{s.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
        </div>
        <a
          href={s.href}
          className="shrink-0 px-3 py-1.5 rounded-lg bg-primary-600/30 hover:bg-primary-600/50 text-xs font-medium text-primary-300 border border-primary-500/30 transition-colors"
        >
          {s.cta}
        </a>
      </div>
    </div>
  );
}
