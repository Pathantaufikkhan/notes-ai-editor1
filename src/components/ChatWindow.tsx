"use client";

import { useState, useRef, useEffect } from "react";
import { useNoteStore } from "@/stores/useNoteStore";
import { fakeChatAPI } from "@/lib/dummyApi";
import type { ChatMessage } from "@/types";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiThinkingDots, setAiThinkingDots] = useState(".");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { notes, activeNoteId, addChatMessage } = useNoteStore();
  const activeNote = notes.find((note) => note.id === activeNoteId);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (loading) {
      interval = setInterval(() => {
        setAiThinkingDots((dots) => (dots.length < 3 ? dots + "." : "."));
      }, 400);
    }

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeNote?.chatHistory.length, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", content: input };
    addChatMessage(activeNoteId!, userMessage);
    setInput("");
    setLoading(true);

    const aiResponse = await fakeChatAPI(input);

    const aiMessage: ChatMessage = { sender: "ai", content: aiResponse };
    addChatMessage(activeNoteId!, aiMessage);
    setLoading(false);
  };

  if (!activeNote) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[400px] max-h-[600px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h2 className="text-base font-semibold dark:text-white">AI Assistant</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeNote.chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] text-sm px-4 py-2 rounded-lg whitespace-pre-wrap animate-fade ${
              msg.sender === "user"
                ? "bg-black text-white self-end ml-auto"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 self-start"
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic">
            AI is thinking{aiThinkingDots}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t dark:border-gray-700 p-3 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask something..."
          className="flex-1 p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="ml-2 px-4 py-2 bg-black hover:bg-blue-700 text-white rounded-md text-sm disabled:opacity-50"
        >
          Send
        </button>
      </div>

      {/* Optional animation */}
      <style jsx>{`
        .animate-fade {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
