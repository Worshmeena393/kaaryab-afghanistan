"use client";

import { useState } from "react";
import { opportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/OpportunityCard";

export default function Opportunities() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = opportunities.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.organization.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.category === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>

      <h1 className="text-2xl font-bold mb-4">
        Opportunities
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search opportunities..."
        className="border p-2 w-full mb-3 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["All", "Job", "Internship", "Scholarship"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded border ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>

    </div>
  );
}