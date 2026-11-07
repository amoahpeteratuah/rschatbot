import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your AI Educational Tutor. Ask me anything about Mathematics, Science, English, Programming, or Current News!",
      sender: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (userText) => {
    // 1. Add user message locally
    const userMessageObj = { id: Date.now(), text: userText, sender: "user" };
    setMessages((prev) => [...prev, userMessageObj]);
    setIsLoading(true);

    try {
      // 2. Fetch answer from FastAPI backend running on port 8000
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });


      if (!response.ok) {
        throw new Error("Failed to communicate with the educational backend.");
      }

      const data = await response.json();

      // 3. Add system response to state engine
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: data.reply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Fetch operational error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "I had trouble reaching my educational database modules. Please check if the backend server is running.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="chat-container">
        <ChatHeader />
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
