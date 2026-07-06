"use client";

import { useState } from "react";

export default function AddOpportunity() {
  const [form, setForm] = useState({
    title: "",
    organization: "",
    category: "Job",
    location: "",
    type: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple fake submit (teacher friendly)
    alert("Opportunity added successfully!");

    console.log("New Opportunity:", form);

    // reset form
    setForm({
      title: "",
      organization: "",
      category: "Job",
      location: "",
      type: "",
      deadline: "",
      description: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Add Opportunity
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />

        <input
          name="organization"
          placeholder="Organization"
          value={form.organization}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        >
          <option>Job</option>
          <option>Internship</option>
          <option>Scholarship</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="type"
          placeholder="Type (Remote / On-site)"
          value={form.type}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          className="border p-3 w-full rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          rows="4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Add Opportunity
        </button>

      </form>

    </div>
  );
}