// Add this in your `types/index.ts` file
export interface ChatMessage {
    sender: "user" | "ai";  // Strict type with "user" or "bot"
    content: string;
  }
  
  export interface Note {
    id: string;
    title: string;
    content: string;
    chatHistory: ChatMessage[];  // Using ChatMessage type here
  }
  