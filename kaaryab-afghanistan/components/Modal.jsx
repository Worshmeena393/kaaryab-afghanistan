"use client";

import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200"
      >
        {children}
      </div>
    </div>
  );
}

export function ConfirmModal({ isOpen, title, description, confirmLabel, cancelLabel, onConfirm, onCancel, tone = "danger" }) {
  const toneCls =
    tone === "danger"
      ? "from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
      : "from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800";
  const iconBg = tone === "danger" ? "bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400" : "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400";
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>
            {tone === "danger" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M3 6h18" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            {description && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition"
          >
            {cancelLabel || "Cancel"}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl bg-gradient-to-r ${toneCls} px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition`}
          >
            {confirmLabel || "Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
