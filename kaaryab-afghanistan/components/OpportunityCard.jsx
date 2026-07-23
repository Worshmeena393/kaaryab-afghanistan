"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/storage";

export default function OpportunityCard({ item, onDelete, showSave = true, showDelete = Boolean(onDelete), onFavoriteChange }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getFavorites().some((f) => f.id === item.id));
  }, [item.id]);

  const daysLeft = Math.max(0, Math.ceil((new Date(item.deadline) - new Date()) / 86400000));
  const isExpiringSoon = daysLeft <= 7;

  const toggleSave = () => {
    const updated = toggleFavorite(item);
    setSaved(updated.some((f) => f.id === item.id));
    if (typeof onFavoriteChange === "function") {
      onFavoriteChange(updated);
    }
  };

  // Get category color
  const getCategoryColor = () => {
    switch (item.category) {
      case "Job":
        return "from-blue-500 to-indigo-600 text-blue-700 dark:text-blue-200 bg-blue-50 dark:bg-blue-900/30";
      case "Internship":
        return "from-emerald-500 to-teal-600 text-emerald-700 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/30";
      case "Scholarship":
        return "from-purple-500 to-violet-600 text-purple-700 dark:text-purple-200 bg-purple-50 dark:bg-purple-900/30";
      case "Remote work":
        return "from-orange-500 to-amber-600 text-orange-700 dark:text-orange-200 bg-orange-50 dark:bg-orange-900/30";
      default:
        return "from-slate-500 to-slate-600 text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50";
    }
  };

  const categoryColor = getCategoryColor();

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between h-full overflow-hidden relative">
      {/* Decorative gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex flex-col gap-4">
        {/* Header section */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link href={`/opportunities/${item.id}`} className="block">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{item.title}</h2>
            </Link>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <span className="text-slate-400">🏢</span> {item.organization}
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-400">📍</span> {item.location}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-slate-400">{item.type}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColor}`}>{item.category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags?.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer section */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
        {/* Deadline info */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className={isExpiringSoon ? "text-red-500" : "text-amber-500"}>⏰</span>
            <span className={`font-medium ${isExpiringSoon ? "text-red-600 dark:text-red-400" : ""}`}>
              {isExpiringSoon ? `Expiring soon (${daysLeft}d left)` : `Due in ${daysLeft} days`}
            </span>
          </div>
          <span>{item.deadline}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {showSave && (
              <button
                type="button"
                onClick={toggleSave}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${saved ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md hover:shadow-lg" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
              >
                {saved ? "❤️ Saved" : "🤍 Save"}
              </button>
            )}
            {showDelete && (
              <button
                type="button"
                onClick={() => onDelete?.(item.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
              >
                🗑️ Remove
              </button>
            )}
          </div>
          <Link href={`/opportunities/${item.id}`} className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200">
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}
