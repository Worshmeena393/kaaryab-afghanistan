"use client";

import { useEffect, useMemo, useState } from "react";
import OpportunityCard from "@/components/OpportunityCard";
import { clearFavorites, deleteFavorite, getFavorites } from "@/lib/storage";

export default function Favorites() {
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
    <div>
      <div className="mb-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Saved Opportunities</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Keep track of opportunities you want to revisit. Use search and sorting to organize your saved list.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Search saved items</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title, organization, or location"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort by</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="recent">Most recent</option>
                <option value="oldest">Oldest saved</option>
                <option value="alphabetical">Title A → Z</option>
              </select>
            </label>
          </div>

          {favorites.length > 0 && (
            <button
              type="button"
              onClick={clearAllFavorites}
              className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
            >
              Clear all saved
            </button>
          )}
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No opportunities saved yet.</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Browse the opportunities page and tap Save to collect your favorites.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
