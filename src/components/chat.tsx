'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Chat() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.content }]);
    setLoading(false);
  }

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>AI Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 min-h-[200px]">
        {messages.length === 0 && (
          <div className="text-muted-foreground text-center">Start the conversation!</div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`rounded-lg px-3 py-2 ${
              msg.role === "user"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] self-end ml-auto max-w-[80%]"
                : "bg-muted text-foreground self-start mr-auto max-w-[80%]"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-muted-foreground text-center">Thinking...</div>
        )}
      </CardContent>
      <CardFooter>
        <form
          className="flex w-full gap-2"
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Say something..."
            className="flex-1"
            autoFocus
            disabled={loading}
          />
          <Button type="submit" variant="default" disabled={loading}>
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}