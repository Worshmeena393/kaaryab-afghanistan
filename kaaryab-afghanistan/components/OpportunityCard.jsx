import Link from "next/link";
import { useState, useEffect } from "react";

export default function OpportunityCard({ item, onDelete }) {
  const [saved, setSaved] = useState(false);

  // check if already saved
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setSaved(favs.some((f) => f.id === item.id));
  }, [item.id]);

  const toggleSave = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");

    let updated;

    if (saved) {
      updated = favs.filter((f) => f.id !== item.id);
    } else {
      updated = [...favs, item];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setSaved(!saved);
  };

  return (
    <div className="border p-4 rounded shadow bg-white">

      <Link href={`/opportunities/${item.id}`}>
        <h2 className="text-xl font-bold text-blue-600 cursor-pointer">
          {item.title}
        </h2>
      </Link>

      <p>{item.organization}</p>
      <p className="text-sm mt-2">{item.description}</p>

      <div className="text-sm text-gray-500 mt-2">
        📍 {item.location} | 🏷 {item.category}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2 mt-3">

        <button
          onClick={toggleSave}
          className={`px-3 py-1 rounded text-white ${
            saved ? "bg-yellow-500" : "bg-gray-500"
          }`}
        >
          {saved ? "Saved ❤️" : "Save"}
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
}