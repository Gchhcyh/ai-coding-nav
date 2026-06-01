"use client";

import { categories } from "@/lib/tools";

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onChange("")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          active === ""
            ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700"
        }`}
      >
        全部
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            active === cat.id
              ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
              : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700"
          }`}
        >
          <span className="mr-1.5">{cat.icon}</span>
          {cat.name}
        </button>
      ))}
    </div>
  );
}
