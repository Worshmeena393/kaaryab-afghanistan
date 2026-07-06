"use client";

import { useEffect, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(data);
  }, []);

  const deleteMessage = (id) => {
    const updated = messages.filter((msg) => msg.id !== id);
    setMessages(updated);
    localStorage.setItem("messages", JSON.stringify(updated));
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-4">
        Messages Inbox 📩
      </h1>

      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div className="space-y-3">

          {messages.map((msg) => (
            <div key={msg.id} className="border p-4 rounded shadow">

              <p><b>Name:</b> {msg.name}</p>
              <p><b>Email:</b> {msg.email}</p>
              <p className="mt-2">{msg.message}</p>

              <button
                onClick={() => deleteMessage(msg.id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}