"use client";

import { useState } from "react";
import { useNoteStore } from "@/stores/useNoteStore";
import { ChatMessage } from "@/types";

export default function ChatUI() {
  const { notes, activeNoteId, addChatMessage } = useNoteStore();
  const [input, setInput] = useState("");
  const activeNote = notes.find((note) => note.id === activeNoteId);

  const sendMessage = () => {
    if (!input.trim() || !activeNoteId) return;

    const userMsg: ChatMessage = {
      sender: "user",
      content: input.trim(),
    };

    const botMsg: ChatMessage = {
      sender: "ai",
      content: "Yeh ek dummy AI ka jawab hai ✨",
    };

    addChatMessage(activeNoteId, userMsg);
    setInput("");

    setTimeout(() => {
      addChatMessage(activeNoteId, botMsg);
    }, 800); // simulate a delay
  };

  if (!activeNote) return null;

  return (
    <div className="p-4 border-t bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {activeNote.chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left dark:bg-gray-800 dark:text-white"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded border dark:bg-gray-800 dark:border-gray-600"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
