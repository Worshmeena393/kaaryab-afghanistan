"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import OpportunityCard from "@/components/OpportunityCard";
import { clearFavorites, deleteFavorite, getFavorites } from "@/lib/storage";
import { useTranslation } from "@/lib/i18n";

export default function Favorites() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const filteredFavorites = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return favorites;
    return favorites.filter((item) => {
      return [item.title, item.organization, item.location, item.category]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [favorites, search]);

  const sortedFavorites = useMemo(() => {
    return [...filteredFavorites].sort((a, b) => {
      if (sort === "oldest") return a.id - b.id;
      if (sort === "alphabetical") return a.title.localeCompare(b.title);
      return b.id - a.id;
    });
  }, [filteredFavorites, sort]);

  const removeFavorite = (id) => {
    const updated = deleteFavorite(id);
    setFavorites(updated);
  };

  const clearAllFavorites = () => {
    clearFavorites();
    setFavorites([]);
  };

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12 px-4 sm:px-0">
      <div className="rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 sm:p-8 md:p-10 shadow-xl">
        <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t("favorites.title")}</h1>
            <p className="mt-2 sm:mt-3 text-purple-100 max-w-2xl text-sm sm:text-base md:text-lg">
              {t("favorites.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/20 backdrop-blur px-5 sm:px-6 py-3 sm:py-4">
              <p className="text-xs sm:text-sm text-purple-100">{t("favorites.totalSavedLabel")}</p>
              <p className="text-2xl sm:text-3xl font-bold mt-1">{favorites.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl sm:rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 md:p-8 shadow-lg">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">{t("favorites.searchFavoritesLabel")}</label>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("favorites.searchFavoritesPlaceholder")}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">{t("favorites.sortByLabel")}</label>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition min-h-[44px]"
              >
                <option value="recent">{t("favorites.sortRecent")}</option>
                <option value="oldest">{t("favorites.sortOldest")}</option>
                <option value="alphabetical">{t("favorites.sortAlphabetical")}</option>
              </select>
            </div>
          </div>

          {favorites.length > 0 && (
            <button
              type="button"
              onClick={clearAllFavorites}
              className="rounded-xl bg-red-500 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:bg-red-600 w-full sm:w-auto min-h-[44px]"
            >
              {t("favorites.clearAllSaved")}
            </button>
          )}
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-2xl sm:rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 sm:p-12 md:p-16 text-center bg-slate-50 dark:bg-slate-900/50">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">⭐</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">{t("favorites.emptyState")}</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md">{t("favorites.emptyStateDesc")}</p>
            <Link href="/opportunities" className="mt-2 sm:mt-4 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition w-full sm:w-auto min-h-[44px]">
              {t("favorites.browseOpportunities")}
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedFavorites.map((item) => (
            <OpportunityCard
              key={item.id}
              item={item}
              onDelete={removeFavorite}
              onFavoriteChange={setFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
}
