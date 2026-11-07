import React, { useState } from "react";

export default function ChatInput({ onSendMessage, isLoading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSendMessage(input.trim());
    setInput(""); // Reset text field immediately after sending
  };

  return (
    <form className="chat-input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question (e.g., 'Simplify 3x + 5x' or 'What is happening in the news?')"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !input.trim()}>
        Send
      </button>
    </form>
  );
}
