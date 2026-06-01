import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Coding Nav - AI编程工具全链路导航",
  description: "覆盖AI编码、Agent开发、MCP工具、代码审查、DevOps全链路的AI编程工具精选导航。帮你找到最适合的AI开发工具。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
