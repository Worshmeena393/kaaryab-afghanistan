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

  return (
    <div className="rounded-[1.75rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-md transition hover:-translate-y-1 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href={`/opportunities/${item.id}`}>
            <h2 className="text-xl font-semibold text-blue-600 hover:underline">{item.title}</h2>
          </Link>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.organization} · {item.location}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.type}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Due {item.deadline}</p>
        </div>
      </div>

      <p className="mt-4 text-slate-600 dark:text-slate-300">{item.description}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1">{item.category}</span>
        {item.tags?.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1">{tag}</span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {showSave && (
          <button
            type="button"
            onClick={toggleSave}
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${saved ? "bg-yellow-500" : "bg-slate-500"}`}
          >
            {saved ? "Favorited ❤️" : "Favorite"}
          </button>
        )}
        {showDelete && (
          <button
            type="button"
            onClick={() => onDelete?.(item.id)}
            className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
