"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldMessages = JSON.parse(localStorage.getItem("messages") || "[]");

    const newMessage = {
      ...form,
      id: Date.now(),
    };

    localStorage.setItem(
      "messages",
      JSON.stringify([...oldMessages, newMessage])
    );

    setSuccess(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Contact Us 📩
      </h1>

      {success && (
        <p className="mb-3 text-green-600">
          Message sent successfully ✔
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="border p-2 w-full rounded h-32"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Message
        </button>

      </form>

    </div>
  );
}