export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            AI Coding Nav — AI编程工具全链路导航。每周更新，帮你找到最适合的AI开发工具。
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Gchhcyh/ai-coding-nav/issues/new" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              提交工具
            </a>
            <a href="https://github.com/Gchhcyh/ai-coding-nav" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              GitHub
            </a>
            <span className="text-xs text-gray-600">MVP v0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
