"use client";

import { useState } from "react";

const categories = ["Job", "Internship", "Scholarship", "Online course", "Remote work", "Volunteer work"];
const types = ["Remote", "On-site"];

export default function OpportunityForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    organization: initialData.organization || "",
    category: initialData.category || "Job",
    location: initialData.location || "",
    type: initialData.type || "Remote",
    deadline: initialData.deadline || "",
    description: initialData.description || "",
    requirements: initialData.requirements?.join(", ") || "",
    applyLink: initialData.applyLink || "",
    tags: initialData.tags?.join(", ") || "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.organization || !form.location || !form.deadline || !form.description || !form.applyLink) {
      setError("Please fill all required fields.");
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
    <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm">
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="title"
          placeholder="Opportunity Title"
          value={form.title}
          onChange={handleChange}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          required
        />
        <input
          name="organization"
          placeholder="Organization"
          value={form.organization}
          onChange={handleChange}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
        >
          {categories.map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
        >
          {types.map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          required
        />
        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          required
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border border-slate-300 dark:border-slate-700 rounded-3xl px-4 py-3 min-h-[140px] bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
        required
      />

      <input
        name="applyLink"
        placeholder="Apply link"
        value={form.applyLink}
        onChange={handleChange}
        className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
        required
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="requirements"
          placeholder="Requirements (comma separated)"
          value={form.requirements}
          onChange={handleChange}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
        />
      </div>

      <button type="submit" className="w-full rounded-3xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
        Save Opportunity
      </button>
    </form>
  );
}
