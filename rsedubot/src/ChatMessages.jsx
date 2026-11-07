import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function ChatMessages({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
          <div className="message-bubble">
            {/* We pass the math plugins here to clear out the $$ tokens */}
            <ReactMarkdown 
              remarkPlugins={[remarkMath]} 
              rehypePlugins={[rehypeKatex]}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="message-wrapper bot">
          <div className="message-bubble loading">
            RSedubot loading...
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}
