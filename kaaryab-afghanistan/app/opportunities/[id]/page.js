"use client";

import { getStoredOpportunities, updateOpportunity, deleteOpportunity } from "@/lib/storage";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "@/lib/storage";
import OpportunityForm from "@/components/OpportunityForm";

// Get category color (same as OpportunityCard)
const getCategoryColor = (category) => {
  switch (category) {
    case "Job":
      return "from-blue-500 to-indigo-600";
    case "Internship":
      return "from-emerald-500 to-teal-600";
    case "Scholarship":
      return "from-purple-500 to-violet-600";
    case "Remote work":
      return "from-orange-500 to-amber-600";
    default:
      return "from-slate-500 to-slate-600";
  }
};

export default function OpportunityDetail() {
  const params = useParams();
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
      <div className="max-w-3xl mx-auto pt-12">
        <div className="text-center">
          <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">😕</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Opportunity not found</h1>
          <Link href="/opportunities" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl">
            ← Back to opportunities
          </Link>
        </div>
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
      <div className="max-w-4xl mx-auto space-y-8 pt-8">
        <div className="flex items-center gap-4">
          <Link href={`/opportunities/${opportunity.id}`} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all">
            ← Back to details
          </Link>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Edit Opportunity</h1>
          <OpportunityForm initialData={opportunity} onSubmit={handleEdit} />
        </div>
      </div>
    );
  }

  const daysLeft = Math.max(0, Math.ceil((new Date(opportunity.deadline) - new Date()) / 86400000));
  const isExpiringSoon = daysLeft <= 7;
  const categoryGradient = getCategoryColor(opportunity.category);

  // Helper to get valid URL
  const getValidApplyUrl = () => {
    if (!opportunity.applyLink) return null;
    let url = opportunity.applyLink.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }
    try {
      new URL(url);
      return url;
    } catch {
      return null;
    }
  };

  const validApplyUrl = getValidApplyUrl();

  const handleApplyClick = (e) => {
    if (!validApplyUrl) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pt-4">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative z-10 p-8 sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <Link href="/opportunities" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all mb-4">
                ← Back to opportunities
              </Link>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">{opportunity.title}</h1>
              <p className="text-xl text-blue-100 flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  🏢 {opportunity.organization}
                </span>
                <span className="text-blue-200/60">•</span>
                <span className="flex items-center gap-1.5">
                  📍 {opportunity.location}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200 shadow-lg ${favorite ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:shadow-xl" : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"}`}
              >
                {favorite ? "❤️ Saved" : "🤍 Save"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ✏️ Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold bg-white/10 backdrop-blur-sm text-red-200 border border-red-200/30 hover:bg-red-500/20 hover:text-red-100 transition-all duration-200 shadow-lg"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span>📝</span> Description
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{opportunity.description}</p>

            {/* Requirements */}
            {opportunity.requirements && opportunity.requirements.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                  <span>✅</span> Requirements
                </h3>
                <ul className="space-y-3">
                  {opportunity.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                      <span className="text-blue-500 text-lg mt-0.5">•</span>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {opportunity.tags && opportunity.tags.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                  <span>🏷️</span> Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {opportunity.tags.map((tag, idx) => (
                    <span key={idx} className="px-5 py-2 rounded-2xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${categoryGradient}`}></div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 font-bold mb-6">Opportunity details</p>
              
              <div className="space-y-5">
                {/* Category */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-1">Category</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{opportunity.category}</p>
                </div>

                {/* Work Type */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-1">Work Type</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{opportunity.type}</p>
                </div>

                {/* Deadline */}
                <div className={`p-4 rounded-2xl ${isExpiringSoon ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" : "bg-slate-50 dark:bg-slate-800/50"}`}>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 font-semibold mb-1">Deadline</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{opportunity.deadline}</p>
                  <p className={`text-sm font-semibold mt-1 ${isExpiringSoon ? "text-red-600 dark:text-red-400" : "text-slate-600 dark:text-slate-400"}`}>
                    {isExpiringSoon ? `⚠️ Expiring soon (${daysLeft} days left)` : `⏰ ${daysLeft} days left`}
                  </p>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-8">
                <a
                  href={validApplyUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleApplyClick}
                  className={`inline-flex items-center justify-center w-full rounded-2xl bg-gradient-to-r ${categoryGradient} text-white px-8 py-4 font-bold hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer ${!validApplyUrl ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {!validApplyUrl ? "Apply Link Unavailable" : opportunity.applyLink?.includes("example.com") ? "View Example Link →" : "Apply Now →"}
                </a>
                {opportunity.applyLink?.includes("example.com") && (
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                      <span>⚠️</span>
                      This is a <strong>demo link</strong> for educational purposes only—it does not lead to a real application page!
                    </p>
                  </div>
                )}
                {!validApplyUrl && opportunity.applyLink && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                    <p className="text-sm text-red-800 dark:text-red-200 flex items-center gap-2">
                      <span>⚠️</span>
                      The application link is invalid. Please contact the opportunity provider for more information.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}