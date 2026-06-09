import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Coding Nav - AI编程工具全链路导航（2026）",
  description: "2026年最新AI编程工具导航：Cursor、Copilot、Claude Code、LangGraph、MCP工具、代码审查、测试工具、DevOps工具全收录。帮你快速找到最适合的AI开发工具。",
  keywords: "AI编程工具,AI代码编辑器,AI Agent框架,MCP工具,AI代码审查,AI测试工具,2026 AI工具,开发者工具导航",
  authors: [{ name: "AI Coding Nav" }],
  openGraph: {
    title: "AI Coding Nav - AI编程工具全链路导航（2026）",
    description: "2026年最新AI编程工具导航：Cursor、Copilot、Claude Code、LangGraph、MCP工具、代码审查、测试工具、DevOps工具全收录。",
    type: "website",
    url: "https://ai-coding-nav.pages.dev",
    siteName: "AI Coding Nav",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Coding Nav - AI编程工具全链路导航（2026）",
    description: "2026年最新AI编程工具导航：Cursor、Copilot、Claude Code、LangGraph、MCP工具、代码审查、测试工具、DevOps工具全收录。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BV6QVKF8EN"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BV6QVKF8EN');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
