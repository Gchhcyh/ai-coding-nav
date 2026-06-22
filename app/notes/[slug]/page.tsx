
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import notes from "@/data/notes.json";
import allTools from "@/data/tools.json";

export function generateStaticParams() {
  return notes.map((n: any) => ({ slug: n.slug }));
}

export default function NoteDetailPage({ params }: { params: { slug: string } }) {
  const note = notes.find((n: any) => n.slug === params.slug);

  if (!note) {
    notFound();
  }

  const tool = allTools.find((t: any) => t.slug === note.tool_slug) as any;

  // Simple Markdown to HTML (handles ##, **, -, numbered lists, paragraphs)
  function renderMarkdown(md: string): string {
    const lines = md.split("\n");
    let html = "";
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Empty line
      if (line.trim() === "") {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        continue;
      }
      // ## heading
      if (line.startsWith("## ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h2 class="text-lg font-semibold text-white mt-6 mb-3">${line.slice(3)}</h2>`;
        continue;
      }
      // ### heading
      if (line.startsWith("### ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h3 class="text-base font-semibold text-white mt-5 mb-2">${line.slice(4)}</h3>`;
        continue;
      }
      // --- horizontal rule
      if (line.trim() === "---") {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<hr class="border-gray-700 my-4" />`;
        continue;
      }
      // Unordered list item
      if (/^[-*]\s/.test(line)) {
        const content = processInline(line.replace(/^[-*]\s/, ""));
        if (!inList) { html += `<ul class="list-disc pl-5 space-y-1 my-2">`; inList = true; }
        html += `<li class="text-gray-300 text-sm">${content}</li>`;
        continue;
      }
      // Numbered list item
      if (/^\d+\.\s/.test(line)) {
        const content = processInline(line.replace(/^\d+\.\s/, ""));
        if (inList) { html += "</ul>"; inList = false; }
        html += `<div class="flex gap-2 my-1"><span class="text-gray-500 text-sm">${line.match(/^\d+/)?.[0]}.</span><span class="text-gray-300 text-sm">${content}</span></div>`;
        continue;
      }
      if (inList) { html += "</ul>"; inList = false; }
      // Paragraph
      html += `<p class="text-gray-300 text-sm leading-relaxed my-2">${processInline(line)}</p>`;
    }
    if (inList) { html += "</ul>"; }
    return html;
  }

  function processInline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-white font-semibold\">$1</strong>")
      .replace(/`(.+?)`/g, "<code class=\"px-1 py-0.5 rounded bg-gray-700 text-primary-300 text-xs\">$1</code>")
      .replace(/\[(.+?)\]\((.+?)\)/g, "<a href=\"$2\" class=\"text-primary-400 hover:underline\">$1</a>");
  }

  const noteContent = renderMarkdown(note.content);

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/notes"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回笔记列表
            </Link>

            {/* Header */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{note.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-8">
              <span>{note.date}</span>
              <span>{note.author}</span>
              {tool && (
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center px-2 py-0.5 rounded bg-primary-600/10 text-primary-400 border border-primary-600/20 hover:bg-primary-600/20 transition-colors"
                >
                  {tool.name}
                </Link>
              )}
              {note.tags && note.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-gray-700/50 text-gray-400 border border-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div
              className="prose-li:my-0"
              dangerouslySetInnerHTML={{ __html: noteContent }}
            />

            {/* Related tool */}
            {tool && (
              <div className="mt-10 p-5 rounded-xl bg-gray-800/40 border border-gray-700/50">
                <p className="text-xs text-gray-500 mb-2">相关工具</p>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-primary-400 hover:underline font-medium text-sm"
                >
                  {tool.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
              </div>
            )}

            {/* Back link bottom */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <Link
                href="/notes"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                &#8592; 返回笔记列表
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
