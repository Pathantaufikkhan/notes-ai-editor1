"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import { useNoteStore } from "@/stores/useNoteStore";
import TitleInput from "@/components/TitleInput";

export default function Editor() {
  const { notes, activeNoteId, updateNoteContent } = useNoteStore();
  const activeNote = notes.find((note) => note.id === activeNoteId);

  // Initialize the editor
  const editor = useEditor({
    extensions: [
      StarterKit, // Removing bulletList and orderedList from StarterKit to keep them enabled
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: activeNote?.content || "",
    editorProps: {
      attributes: {
        class: "min-h-[200px] outline-none",
      },
    },
    onUpdate({ editor }) {
      if (activeNoteId) {
        updateNoteContent(activeNoteId, editor.getHTML());
      }
    },
    autofocus: true,
    injectCSS: true, // Ensure CSS is injected for styling
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && activeNote) {
      editor.commands.setContent(activeNote.content || "", false); // false = don't emit transaction to avoid onUpdate loop
    }
  }, [activeNoteId, activeNote?.content, editor]);
  

  if (!editor || !activeNote) {
    return <p className="p-4">Koi note select karo</p>; // Message when no note is selected
  }

  const handleSave = () => {
    if (activeNoteId) {
      updateNoteContent(activeNoteId, editor.getHTML());
      console.log("Note saved!");
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-lg max-w-3xl mx-auto my-6">
      <TitleInput />

      {/* Editor Controls */}
      <div className="space-x-2 mb-4 flex flex-wrap">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Strike
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          H3
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          • Bullet List
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          1. Numbered List
        </button>
      </div>

      {/* Editor */}
      <div className="prose max-w-none dark:prose-invert">
        <EditorContent editor={editor} />
      </div>

    

      {/* CSS to force heading styles */}
      <style jsx global>{`
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
        }
        .ProseMirror h2 {
          font-size: 1.75rem;
          font-weight: bold;
        }
        .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror li {
          margin-left: 1.5rem;
        }
      `}</style>
    </div>
  );
}
