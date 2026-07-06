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
    <div className="max-w-6xl mx-auto">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Opportunities
      </h1>

      {/* SEARCH BOX */}
      <input
        type="text"
        placeholder="Search opportunities..."
        className="border p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-6 flex-wrap">

        {["All", "Job", "Internship", "Scholarship"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full border transition ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}

      </div>

      {/* RESULTS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.length > 0 ? (
          filtered.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-gray-500">
            No opportunities found.
          </p>
        )}

      </div>

    </div>
  );
}