"use client";

import { useState } from "react";
import { saveMessage } from "@/lib/storage";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = { ...form, id: Date.now() };
    saveMessage(entry);
    setForm({ name: "", email: "", message: "" });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h1>

      {success && <p className="mb-3 text-green-600">Message saved locally ✔</p>}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-950">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
          <textarea name="message" value={form.message} onChange={handleChange} required className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 h-36 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="rounded-2xl bg-blue-600 px-4 py-2 text-white font-semibold">Send Message</button>
          <p className="text-sm text-slate-500 dark:text-slate-400">Messages are saved locally in your browser.</p>
        </div>
      </form>
    </div>
  );
}
