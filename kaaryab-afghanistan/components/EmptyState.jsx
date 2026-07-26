"use client";

import Link from "next/link";

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  tone = "blue",
}) {
  const toneMap = {
    blue: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40",
    gray: "from-slate-50 to-slate-100 dark:from-slate-900/40 dark:to-slate-800/40 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800",
    rose: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40",
  };
  const toneCls = toneMap[tone] || toneMap.blue;

  const ButtonEl = actionHref ? Link : "button";

  return (
    <div className={`flex w-full flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed bg-gradient-to-br p-10 text-center sm:p-14 ${toneCls}`}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60 dark:bg-slate-900/50 ring-1 ring-current/20 shadow-inner">
        <div className="text-4xl">
          {icon || (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )}
        </div>
      </div>
      <div className="max-w-md space-y-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title || "Nothing here yet"}</h3>
        {description && <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>}
      </div>
      {(actionLabel && (actionHref || onAction)) && (
        <ButtonEl
          href={actionHref || undefined}
          onClick={onAction || undefined}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
        >
          {actionLabel}
        </ButtonEl>
      )}
    </div>
  );
}
