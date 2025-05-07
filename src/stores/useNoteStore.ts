import { create } from "zustand";
import { ChatMessage, Note } from "@/types";
import { nanoid } from "nanoid";

interface NoteStore {
  notes: Note[];
  activeNoteId: string | null;
  setActiveNote: (id: string) => void;
  addNote: () => void;
  updateNoteContent: (id: string, content: string) => void;
  updateNoteTitle: (id: string, title: string) => void;
  addChatMessage: (id: string, message: ChatMessage) => void;
  deleteNote: (id: string) => void; // Add deleteNote function
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  activeNoteId: null,
  setActiveNote: (id) => set({ activeNoteId: id }),
  addNote: () =>
    set((state) => {
      const newNote: Note = {
        id: nanoid(),
        title: "Untitled",
        content: "",
        chatHistory: [],
      };
      return {
        notes: [...state.notes, newNote],
        activeNoteId: newNote.id,
      };
    }),
  updateNoteContent: (id, content) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content } : note
      ),
    })),
  updateNoteTitle: (id, title) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title } : note
      ),
    })),
  addChatMessage: (id, message) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? { ...note, chatHistory: [...note.chatHistory, message] }
          : note
      ),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id), // Removes the note with the given ID
      activeNoteId: state.activeNoteId === id ? null : state.activeNoteId, // Clear active note if deleted
    })),
}));
