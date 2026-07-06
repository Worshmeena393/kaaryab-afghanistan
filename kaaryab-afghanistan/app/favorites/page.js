"use client";

import { useEffect, useState } from "react";
import OpportunityCard from "@/components/OpportunityCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(data);
  }, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-4">
        Saved Opportunities ❤️
      </h1>

      {favorites.length === 0 ? (
        <p>No saved jobs yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {favorites.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
}