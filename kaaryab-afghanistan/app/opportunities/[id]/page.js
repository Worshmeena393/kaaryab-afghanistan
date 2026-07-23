"use client";

import { getStoredOpportunities, updateOpportunity, deleteOpportunity } from "@/lib/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "@/lib/storage";
import OpportunityForm from "@/components/OpportunityForm";

export default function OpportunityDetail({ params }) {
  const [opportunity, setOpportunity] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const list = getStoredOpportunities();
    const found = list.find((item) => item.id === params.id);
    setOpportunity(found || null);
    if (found) {
      setFavorite(isFavorite(found.id));
    }
  }, [params.id]);

  if (!opportunity) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Opportunity not found</h1>
        <Link href="/opportunities" className="text-blue-600 hover:underline">Back to opportunities</Link>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    const updated = toggleFavorite(opportunity);
    setFavorite(updated.some((item) => item.id === opportunity.id));
  };

  const handleEdit = (data) => {
    const updated = { ...opportunity, ...data };
    updateOpportunity(updated);
    setOpportunity(updated);
    setEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      deleteOpportunity(opportunity.id);
      router.push("/opportunities");
    }
  };

  if (editing) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/opportunities/${opportunity.id}`} className="text-blue-600 hover:underline">Back to details</Link>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Opportunity</h1>
        <OpportunityForm initialData={opportunity} onSubmit={handleEdit} />
      </div>
    );
  }

  const daysLeft = Math.max(0, Math.ceil((new Date(opportunity.deadline) - new Date()) / 86400000));

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/opportunities" className="text-blue-600 hover:underline text-sm font-medium">← Back to opportunities</Link>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mt-3">{opportunity.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">{opportunity.organization} • {opportunity.location}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${favorite ? "bg-yellow-500 text-white shadow-md" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
          >
            {favorite ? "Saved ⭐" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-full px-5 py-2.5 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full px-5 py-2.5 text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition shadow-md"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Description</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{opportunity.description}</p>

            {opportunity.requirements && opportunity.requirements.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                  {opportunity.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {opportunity.tags && opportunity.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {opportunity.tags.map((tag, idx) => (
                  <span key={idx} className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 text-sm text-slate-600 dark:text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-100 font-medium">Opportunity details</p>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-blue-100 text-sm">Category</p>
                <p className="text-xl font-bold">{opportunity.category}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Work type</p>
                <p className="text-xl font-bold">{opportunity.type}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Deadline</p>
                <p className="text-xl font-bold">{opportunity.deadline}</p>
                <p className="text-blue-100 text-sm mt-1">{daysLeft} days left</p>
              </div>
            </div>
            <a
              href={opportunity.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center w-full rounded-full bg-white text-blue-600 px-6 py-3 font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              Apply Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}