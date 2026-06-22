"use client";

interface ToolDetailListProps {
  best_for?: string;
  not_for?: string;
  variant?: "full" | "compact";
}

export default function ToolDetailList({ best_for, not_for, variant = "full" }: ToolDetailListProps) {
  if (!best_for && !not_for) return null;

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {best_for && (
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            适合: {best_for.length > 14 ? best_for.slice(0, 14) + "…" : best_for}
          </span>
        )}
        {not_for && (
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            不适合: {not_for.length > 14 ? not_for.slice(0, 14) + "…" : not_for}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {best_for && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/15">
          <span className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <span className="text-sm font-medium text-green-400">最适合</span>
            <p className="text-sm text-gray-300 mt-1">{best_for}</p>
          </div>
        </div>
      )}
      {not_for && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/15">
          <span className="shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
            <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <div>
            <span className="text-sm font-medium text-red-400">不适合</span>
            <p className="text-sm text-gray-300 mt-1">{not_for}</p>
          </div>
        </div>
      )}
    </div>
  );
}
