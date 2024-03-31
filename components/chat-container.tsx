"use client";

import { Message, useChat } from "ai/react";
import { useEffect, useRef } from "react";
import ChatBubble from "./chat-bubble";

export default function ChatContainer(props: {
  messages: Message[];
  isLoading: boolean;
}) {
  const { messages, isLoading } = props;

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="col-span-4 w-full min-h-full bg-white h-64 rounded-xl overflow-auto" ref={messagesContainerRef}>
      {messages.map((m, i) => (
        <ChatBubble
          isUser={m.role === "user"}
          message={m.content}
          key={i}
        />
      ))}

      {isLoading && (
        <div className="flex justify-end pr-4">
          <span className="animate-bounce">...</span>
        </div>
      )}
    </div>
  );
}
