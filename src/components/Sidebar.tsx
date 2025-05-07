"use client";

import { useState } from "react";
import { useNoteStore } from "@/stores/useNoteStore";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle state
  const { notes, activeNoteId, setActiveNote, addNote } = useNoteStore();

  return (
    <div
      className={`${
        isOpen ? "w-60" : "w-16"
      } transition-all duration-300 bg-gray-100 h-screen p-4 space-y-4 shadow-md`}
    >
      {/* Sidebar Toggle Button */}
      <button
        className="absolute top-4 left-4 text-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "←" : "→"}
      </button>

<br />
      {/* New Note Button */}
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={addNote}
      >
        {isOpen && "+ New Note"}
      </button>

      {/* Notes List */}
      <ul className="space-y-2 mt-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className={`p-2 rounded cursor-pointer ${
              note.id === activeNoteId ? "bg-blue-100" : "bg-white"
            }`}
            onClick={() => setActiveNote(note.id)}
          >
            {isOpen ? note.title || "Untitled" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
