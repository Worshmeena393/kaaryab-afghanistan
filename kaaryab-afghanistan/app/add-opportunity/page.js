"use client";

import { useState } from "react";

export default function AddOpportunity() {
  const [form, setForm] = useState({
    title: "",
    organization: "",
    category: "Job",
    location: "",
    type: "Remote",
    deadline: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // save to localStorage
    const oldData = JSON.parse(localStorage.getItem("opportunities") || "[]");

    const newData = [...oldData, { ...form, id: Date.now().toString() }];

    localStorage.setItem("opportunities", JSON.stringify(newData));

    alert("Opportunity Added Successfully!");

    setForm({
      title: "",
      organization: "",
      category: "Job",
      location: "",
      type: "Remote",
      deadline: "",
      description: ""
    });
  };

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Add Opportunity
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="organization"
          placeholder="Organization"
          value={form.organization}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full"
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
          className="border p-2 w-full"
        />

        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>

      </form>

    </div>
  );
}