import Sidebar from "@/components/Sidebar";
import Editor from "@/components/Editor";
import ChatButton from "@/components/ChatButton";

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">AI Notes Editor</h1>
        <Editor />
      </main>

      {/* Floating Chat Button */}
      <ChatButton />
    </div>
  );
}
