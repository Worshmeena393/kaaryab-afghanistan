"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

const categories = [
  "Job",
  "Internship",
  "Scholarship",
  "Online course",
  "Remote work",
  "Volunteer work",
  "Advanced Training",
  "Professional Development",
];
const types = ["Remote", "On-site", "Hybrid"];

// Map category to translation key
const getCategoryKey = (category) => {
  switch (category) {
    case "Job":
      return "opportunities.job";
    case "Internship":
      return "opportunities.internship";
    case "Scholarship":
      return "opportunities.scholarship";
    case "Online course":
      return "filters.onlineCourse";
    case "Remote work":
      return "opportunities.remoteWork";
    case "Volunteer work":
      return "opportunities.volunteerWork";
    case "Advanced Training":
      return "opportunities.advancedTraining";
    case "Professional Development":
      return "opportunities.professionalDevelopment";
    default:
      return "opportunities.all";
  }
};

// Map type to translation key
const getTypeKey = (type) => {
  switch (type) {
    case "Remote":
      return "opportunities.remote";
    case "On-site":
      return "opportunities.onSite";
    case "Hybrid":
      return "opportunities.hybrid";
    default:
      return "opportunities.all";
  }
};

// Helper to format date as YYYY-MM-DD
const formatDateForInput = (dateStr) => {
  let date;
  if (!dateStr) {
    // If no dateStr, set default to 30 days from now
    date = new Date();
    date.setDate(date.getDate() + 30);
  } else {
    date = new Date(dateStr);
    // If date is invalid, default to 30 days from now
    if (isNaN(date.getTime())) {
      date = new Date();
      date.setDate(date.getDate() + 30);
    }
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function OpportunityForm({ initialData = {}, onSubmit }) {
  const { t } = useTranslation();
  
  const [form, setForm] = useState({
    title: initialData.title || "",
    organization: initialData.organization || "",
    category: initialData.category || "Job",
    location: initialData.location || "",
    type: initialData.type || "Remote",
    deadline: formatDateForInput(initialData.deadline) || "",
    description: initialData.description || "",
    requirements: initialData.requirements?.join(", ") || "",
    applyLink: initialData.applyLink || "",
    tags: initialData.tags?.join(", ") || "",
  });

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.organization || !form.location || !form.deadline || !form.description || !form.applyLink) {
      setError(t("home.verifiedDesc"));
      return;
    }

    if (!isValidUrl(form.applyLink)) {
      setError(t("detail.invalidLink"));
      return;
    }

    setError("");
    onSubmit({
      ...form,
      requirements: form.requirements
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      tags: form.tags
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-lg">
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}

      {/* Opportunity Title + Company/Organization Name - 2 columns */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.titleLabel")}</label>
          <input
            name="title"
            placeholder={t("form.titlePlaceholder")}
            value={form.title}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.organizationLabel")}</label>
          <input
            name="organization"
            placeholder={t("form.organizationPlaceholder")}
            value={form.organization}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Category + Work Type - 2 columns */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.categoryLabel")}</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((value) => (
              <option key={value} value={value}>{t(getCategoryKey(value))}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.typeLabel")}</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {types.map((value) => (
              <option key={value} value={value}>{t(getTypeKey(value))}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Location + Deadline Date - 2 columns */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.locationLabel")}</label>
          <input
            name="location"
            placeholder={t("form.locationPlaceholder")}
            value={form.location}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.deadlineLabel")}</label>
          <input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      {/* Description (full width) */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.descriptionLabel")}</label>
        <textarea
          name="description"
          placeholder={t("form.descriptionPlaceholder")}
          value={form.description}
          onChange={handleChange}
          className="w-full border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 min-h-[140px] bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Application Link (full width) */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.applyLinkLabel")}</label>
        <input
          name="applyLink"
          type="url"
          placeholder={t("form.applyLinkPlaceholder")}
          value={form.applyLink}
          onChange={handleChange}
          className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Requirements + Tags - 2 columns */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.requirementsLabel")}</label>
          <input
            name="requirements"
            placeholder={t("form.requirementsPlaceholder")}
            value={form.requirements}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">{t("form.tagsLabel")}</label>
          <input
            name="tags"
            placeholder={t("form.tagsPlaceholder")}
            value={form.tags}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white font-bold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl">
        {t("form.saveOpportunity")}
      </button>
    </form>
  );
}
