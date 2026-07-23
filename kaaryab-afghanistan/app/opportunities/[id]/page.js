"use client";

import { getStoredOpportunities } from "@/lib/storage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "@/lib/storage";

export default function OpportunityDetail({ params }) {
  const [opportunity, setOpportunity] = useState(null);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const list = getStoredOpportunities();
    const found = list.find(
    (item) => item.id === params.id
  );

  if (!opportunity) {
    return <h1>Opportunity not found</h1>;
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-blue-600">
        {opportunity.title}
      </h1>

      <p className="text-gray-600 dark:text-slate-300 mt-2">
        {opportunity.organization}
      </p>

      <div className="mt-4 space-y-2">

        <p className="text-slate-700 dark:text-slate-300"><b>Category:</b> {opportunity.category}</p>
        <p className="text-slate-700 dark:text-slate-300"><b>Location:</b> {opportunity.location}</p>
        <p className="text-slate-700 dark:text-slate-300"><b>Type:</b> {opportunity.type}</p>
        <p className="text-slate-700 dark:text-slate-300"><b>Deadline:</b> {opportunity.deadline}</p>

      </div>

      <p className="mt-4 text-slate-700 dark:text-slate-300">
        {opportunity.description}
      </p>

    </div>
  );
}