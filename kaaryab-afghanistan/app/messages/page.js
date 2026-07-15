"use client";

import { useEffect, useMemo, useState } from "react";
import { clearMessages, deleteMessage, getMessages } from "@/lib/storage";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return messages;
    return messages.filter((msg) => {
      return [msg.name, msg.email, msg.message]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [messages, search]);

  const sortedMessages = useMemo(() => {
    return [...filteredMessages].sort((a, b) => {
      if (sort === "oldest") return a.id - b.id;
      if (sort === "sender") return a.name.localeCompare(b.name);
      return b.id - a.id;
    });
  }, [filteredMessages, sort]);

  const handleDelete = (id) => {
    const updated = deleteMessage(id);
    setMessages(updated);
  };

  const handleClearAll = () => {
    clearMessages();
    setMessages([]);
  };

  return (
    <div>
      <div className="mb-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Messages Inbox</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Review messages from your contact form and stay on top of every new request.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 p-4 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <p className="text-sm">Total messages</p>
            <p className="mt-1 text-2xl font-semibold">{messages.length}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Search inbox</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, or message"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort messages</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="recent">Most recent</option>
              <option value="oldest">Oldest first</option>
              <option value="sender">Sender name</option>
            </select>
          </label>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="mt-6 rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
          >
            Clear all messages
          </button>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No messages found.</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Messages submitted through the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedMessages.map((message) => (
            <div key={message.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">From</p>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{message.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{message.email}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                  {new Date(message.id).toLocaleString()}
                </div>
              </div>
              <p className="mt-4 text-slate-700 dark:text-slate-300">{message.message}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleDelete(message.id)}
                  className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Delete message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
