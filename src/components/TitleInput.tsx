"use client";

import { useNoteStore } from "@/stores/useNoteStore";

export default function TitleInput() {
  const { notes, activeNoteId, updateNoteContent, deleteNote, updateNoteTitle } = useNoteStore();
  const activeNote = notes.find((note) => note.id === activeNoteId);

  if (!activeNote) return null;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    // Update just the title — not the content
    useNoteStore.setState((state) => ({
      notes: state.notes.map((note) =>
        note.id === activeNoteId ? { ...note, title: newTitle } : note
      ),
    }));
  };

  // Handle Save: Save the note content
  const handleSave = () => {
    if (activeNoteId) {
      updateNoteContent(activeNoteId, activeNote.content); // Assuming save is linked to content
    }
  };

  // Handle Delete: Delete the active note
  const handleDelete = () => {
    if (activeNoteId) {
      deleteNote(activeNoteId);
    }
  };

  // Handle Update Title
  const handleUpdateTitle = () => {
    if (activeNoteId) {
      updateNoteTitle(activeNoteId, activeNote.title); // Update the title
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <input
          type="text"
          value={activeNote.title}
          onChange={handleTitleChange}
          placeholder="Enter title..."
          className="w-full text-2xl font-semibold bg-transparent border-b border-gray-300 dark:border-gray-600 mb-4 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={handleUpdateTitle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
