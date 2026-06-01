"use client";

import { useState, useEffect } from "react";
import Fuse from "fuse.js";

interface SearchBarProps {
  tools: any[];
  onResults: (results: any[]) => void;
}

export default function SearchBar({ tools, onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const fuse = new Fuse(tools, {
    keys: ["name", "description", "tags", "category"],
    threshold: 0.3,
  });

  useEffect(() => {
    if (!query.trim()) {
      onResults(tools);
      return;
    }
    const results = fuse.search(query).map((r) => r.item);
    onResults(results);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索工具名称、标签、用途... 例如：Cursor、Agent、开源"
        className="w-full pl-12 pr-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
