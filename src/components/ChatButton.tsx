"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";
import { MessageCircle } from "lucide-react";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-black text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        title="Chat with AI"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
}
