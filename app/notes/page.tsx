"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import notes from "@/data/notes.json";
import allTools from "@/data/tools.json";

type Note = (typeof notes)[number];

export default function NotesPage() {
  const [filterTag, setFilterTag] = useState("");

  const allTags = Array.from(new Set(notes.flatMap((n: Note) => n.tags || [])));
  const filteredNotes = filterTag
    ? notes.filter((n: Note) => n.tags?.includes(filterTag))
    : notes;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              实战笔记
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              真实使用体验和对比评测，帮你在选工具时少走弯路
            </p>

            {allTags.length > 0 && (
              <div className="flex gap-2 mb-8 flex-wrap">
                <button
                  onClick={() => setFilterTag("")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    !filterTag
                      ? "bg-primary-600 text-white"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  全部
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilterTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      filterTag === tag
                        ? "bg-primary-600 text-white"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 border border-gray-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {filteredNotes.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">暂无匹配的笔记</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredNotes.map((note: Note) => {
                  const tool = allTools.find((t: any) => t.slug === note.tool_slug) as any;
                  return (
                    <Link
                      key={note.slug}
                      href={`/notes/${note.slug}`}
                      className="block p-5 rounded-xl bg-gray-800/40 border border-gray-700/50 hover:border-primary-500/40 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors">
                            {note.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {note.date} · {note.author}
                            {tool && (
                              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-gray-700/50 text-gray-400 border border-gray-600">
                                {tool.name}
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2">{note.excerpt}</p>
                          {note.tags && (
                            <div className="flex gap-1.5 mt-3">
                              {note.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded text-[10px] bg-gray-700/50 text-gray-400 border border-gray-600"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-gray-600 text-xl shrink-0 group-hover:text-primary-400 transition-colors">
                          &#8594;
                        </span>
                      </div>
                    </Link>
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
