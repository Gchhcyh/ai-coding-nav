# 社区推广文案 — Reddit & Hacker News

---

## Reddit r/programming

**标题**：I tested 18 AI coding tools so you don't have to — here's what I learned (and why I built a comparison engine)

**正文**：

I spent two weeks testing every AI coding tool I could find — Cursor, Copilot, Claude Code, Aider, Cline, Windsurf, the whole lot. I kept detailed notes on what worked and what made me want to throw my laptop out the window.

Here's the short version:

- Cursor is still the best all-around AI IDE, but its $20/mo pricing stings
- Claude Code crushes complex backend tasks but has zero IDE integration
- Aider is the sleeper hit for terminal-dwellers — git-native workflow is brilliant
- GitHub Copilot is fine for autocomplete, terrible for multi-file refactoring
- Most "AI coding tool directories" are just SEO farms with affiliate links

That last point really got to me. Every directory I found was the same: a long list of tool names, one-sentence descriptions, affiliate links. Zero context about which tool fits which developer. Zero real comparison data.

So I built [AI Coding Nav](https://ai-coding-nav.pages.dev) — it's a static site (Next.js, no backend) that does three things:
1. **Compare up to 4 tools side-by-side** with pros/cons/best-for/not-for
2. **Real usage notes** from my 2-week testing marathon (no AI-generated fluff)
3. **Scenario-based recommendations** — tell it what kind of developer you are, it suggests tools

It's open source (MIT), no ads running, no affiliate links in the content. The data is all in a JSON file so anyone can fork it and add their own tools.

I'd love feedback from actual developers — what tools am I missing? What comparison data would actually help you make a decision? The worst thing that can happen is I built this for myself and nobody else cares.

**Repo**: https://github.com/Gchhcyh/ai-coding-nav

---

## Hacker News — Show HN

**Title**: Show HN: AI Coding Nav — Open-source comparison engine for AI coding tools

**Text**:

A static site (Next.js + Cloudflare Pages) with a JSON-backed tool database. The key difference from existing directories:

- Side-by-side comparison (up to 4 tools, matrix view with pros/cons)
- Real usage notes from testing each tool (not scraped descriptions)
- Scenario-based matching ("I'm a full-stack dev, I need X, Y, Z")

Why I built this: every AI tool directory I found was a link farm. They don't help you decide — they just list things. I wanted a decision engine, not another list.

84 tools across 6 categories. All data in `data/tools.json`. Contributions welcome.

Tech: Next.js 14 (static export), Tailwind, Fuse.js for search. No backend, no database, no tracking beyond GA4 (anonymized).

https://ai-coding-nav.pages.dev
https://github.com/Gchhcyh/ai-coding-nav
