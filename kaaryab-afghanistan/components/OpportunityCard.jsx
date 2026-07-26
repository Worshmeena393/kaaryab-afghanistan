"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/storage";
import { useTranslation } from "@/lib/i18n";

export default function OpportunityCard({ item, onDelete, showSave = true, showDelete = Boolean(onDelete), onFavoriteChange }) {
  const [saved, setSaved] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setSaved(getFavorites().some((f) => f.id === item.id));
  }, [item.id]);

  const daysLeft = Math.max(0, Math.ceil((new Date(item.deadline) - new Date()) / 86400000));
  const isExpiringSoon = daysLeft <= 7;
  const deadlineLabel = isExpiringSoon
    ? `${t("card.expiringSoon")} (${daysLeft} ${t("card.daysLeft")})`
    : `${daysLeft} ${t("card.daysLeft")}`;

  const toggleSave = () => {
    const updated = toggleFavorite(item);
    setSaved(updated.some((f) => f.id === item.id));
    if (typeof onFavoriteChange === "function") {
      onFavoriteChange(updated);
    }
  };

  // Map category to translation key
  const getCategoryKey = (category) => {
    switch (category) {
      case "Job":
        return "opportunities.job";
      case "Internship":
        return "opportunities.internship";
      case "Scholarship":
        return "opportunities.scholarship";
      case "Remote work":
        return "opportunities.remoteWork";
      case "Volunteer work":
        return "opportunities.volunteerWork";
      case "Advanced Training":
        return "opportunities.advancedTraining";
      case "Professional Development":
        return "opportunities.professionalDevelopment";
      default:
        return "opportunities.all";
    }
  };

  // Map type to translation key
  const getTypeKey = (type) => {
    switch (type) {
      case "Remote":
        return "opportunities.remote";
      case "On-site":
        return "opportunities.onSite";
      case "Hybrid":
        return "opportunities.hybrid";
      default:
        return "opportunities.all";
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
  const saveButtonClass = saved ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md hover:shadow-lg" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700";
  const deadlineTextClass = isExpiringSoon ? "text-red-600 dark:text-red-400" : "";

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2 flex flex-col justify-between h-full overflow-hidden relative">
      {/* Decorative gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex flex-col gap-3 sm:gap-4 flex-1">
        {/* Header section */}
        <div className="flex flex-col gap-2.5 sm:gap-3 w-full min-w-0">
          <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 w-full min-w-0">
            <div className="w-full min-w-0 flex-1">
              <Link href={`/opportunities/${item.id}`} className="block w-full min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 break-words w-full">{item.title}</h2>
              </Link>
              {/* Badge row — type + category always side-by-side on one line */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full whitespace-nowrap shrink-0">{t(getTypeKey(item.type))}</span>
                <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${categoryColor} whitespace-nowrap shrink-0`}>{t(getCategoryKey(item.category))}</span>
              </div>
            </div>
          </div>
          {/* Org + location row always shows both with proper stacking */}
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-1 sm:gap-3 text-[11px] sm:text-sm text-slate-600 dark:text-slate-400 w-full min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="shrink-0 text-slate-400">🏢</span>
              <span className="truncate">{item.organization}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="shrink-0 text-slate-400">📍</span>
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {item.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer section */}
      <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 sm:gap-3">
        {/* Deadline info — fixed duplicate "days left" wording */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 shrink">
            <span className={isExpiringSoon ? "text-red-500 shrink-0" : "text-amber-500 shrink-0"}>⏰</span>
            <span className={"font-medium truncate " + deadlineTextClass}>
              {deadlineLabel}
            </span>
          </div>
          <span className="whitespace-nowrap text-right shrink-0 tabular-nums">{item.deadline}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {showSave && (
              <button
                type="button"
                onClick={toggleSave}
                className={"flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 shrink-0 " + saveButtonClass + " min-h-[36px]"}
              >
                {saved ? t("card.saved") : t("card.save")}
              </button>
            )}
            {showDelete && (
              <button
                type="button"
                onClick={() => onDelete?.(item.id)}
                className="flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 shrink-0 min-h-[36px]"
              >
                🗑️ {t("card.remove")}
              </button>
            )}
          </div>
          <Link href={`/opportunities/${item.id}`} className="flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 shrink-0 min-h-[36px]">
            {t("card.view")}
          </Link>
        </div>
      </div>
    </div>
  );
}
