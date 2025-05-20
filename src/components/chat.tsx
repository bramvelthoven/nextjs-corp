"use client";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const FREE_PROMPT_LIMIT = 5;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptCount, setPromptCount] = useState(0);

  const messagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || promptCount >= FREE_PROMPT_LIMIT) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsGenerating(true);
    setPromptCount((count) => count + 1);

    const res = await fetch("/api/answer", {
      method: "POST",
      body: JSON.stringify({ question: input }),
    });

    if (!res.body) {
      setIsLoading(false);
      setIsGenerating(false);
      return;
    }

    const aiMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, aiMessage]);

    let aiContent = "";
    ChatCompletionStream.fromReadableStream(res.body)
      .on("content", (delta) => {
        aiContent += delta;
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 && msg.role === "assistant"
              ? { ...msg, content: aiContent }
              : msg
          )
        );
      })
      .on("end", () => {
        setIsLoading(false);
        setIsGenerating(false);
      });
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || isLoading || !input || promptCount >= FREE_PROMPT_LIMIT) return;
      setIsGenerating(true);
      formRef.current?.requestSubmit();
    }
  };

  return (
    <section className="flex flex-col h-full max-w-2xl mx-auto bg-background rounded-lg shadow mt-8">
      {/* Header */}
      <header className="px-6 py-4 border-b flex flex-col items-center text-center">
        <h1 className="text-2xl font-semibold">Chat with our Coach ✨</h1>
        <p className="text-muted-foreground">What's on your mind today?</p>
        <div className="flex gap-2 items-center pt-2">
          <Button
            variant="secondary"
            onClick={() => {
              setMessages([]);
              setPromptCount(0);
            }}
            disabled={isLoading || isGenerating}
          >
            New Chat
          </Button>
          <Button variant="secondary" asChild>
            <a href="/faq">See FAQ</a>
          </Button>
        </div>
      </header>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto min-h-120 px-4 py-6" ref={messagesRef}>
        <ChatMessageList>
          {messages.length === 0 && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar src="" fallback="🤖" />
              <ChatBubbleMessage>
                Hello! I'm the AI assistant. How can I help you today?
              </ChatBubbleMessage>
            </ChatBubble>
          )}
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              variant={message.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                src=""
                fallback={message.role === "user" ? "👨🏽" : "🤖"}
              />
              <ChatBubbleMessage
                variant={message.role === "user" ? "sent" : "received"}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {isGenerating && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar src="" fallback="🤖" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>
      {/* Input */}
      <footer className="px-6 py-4 border-t bg-muted/25">
        <form
          ref={formRef}
          className="flex relative gap-2"
          onSubmit={handleSubmit}
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-h-12 bg-background shadow-none"
            placeholder={
              promptCount >= FREE_PROMPT_LIMIT
                ? "Please upgrade to continue chatting"
                : "Ask me a question"
            }
            disabled={isLoading || isGenerating || promptCount >= FREE_PROMPT_LIMIT}
          />
          <Button
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            type="submit"
            size="icon"
            disabled={isLoading || isGenerating || !input || promptCount >= FREE_PROMPT_LIMIT}
          >
            <Send className="size-4" />
          </Button>
        </form>
        {promptCount >= FREE_PROMPT_LIMIT && (
          <div className="mt-4 text-center">
            <p className="text-red-400 font-semibold mb-2">
              Free demo limit reached. Please choose a plan to continue.
            </p>
            <Button asChild>
              <Link href="/pricing">See Plans & Pricing</Link>
            </Button>
          </div>
        )}
      </footer>
    </section>
  );
}