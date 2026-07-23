"use client";

import { useState } from "react";
import { saveMessage } from "@/lib/storage";
import { useTranslation } from "@/lib/i18n";

export default function Contact() {
  const { t } = useTranslation();
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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-3">{t("contact.title")}</h1>
        <p className="text-blue-600 dark:text-blue-300">{t("contact.subtitle")}</p>
      </div>

      {success && (
        <div className="mb-6 rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-4 text-center">
          <p className="text-green-700 dark:text-green-300 font-medium">{t("contact.successMessage")}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-slate-200 dark:border-slate-700 p-8 bg-white dark:bg-slate-900 shadow-lg">
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("contact.nameLabel")}</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 placeholder-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={t("contact.namePlaceholder")}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("contact.emailLabel")}</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 placeholder-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={t("contact.emailPlaceholder")}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("contact.messageLabel")}</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 h-40 text-slate-900 placeholder-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder={t("contact.messagePlaceholder")}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            {t("contact.sendMessage")}
          </button>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t("contact.localSaveNote")}</p>
        </div>
      </form>
    </div>
  );
}
