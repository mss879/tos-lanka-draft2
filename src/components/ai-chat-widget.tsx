"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

type Message = { role: "user" | "assistant"; content: string };

const WELCOME_MESSAGE = "Hey there! 👋 I'm part of the **TOS Lanka** team — we're a Japanese-owned electronics manufacturer based in Sri Lanka.\n\nWhether you've got questions about **PCB assembly**, **prototyping**, **automotive harnessing**, or any of our 9 service lines — I'm here to help.\n\nWhat are you working on?";

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => generateUUID());

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when widget opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: inputValue.trim() };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      // Send only user/assistant messages (strip the initial welcome if needed)
      const apiMessages = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, sessionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch (err: any) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    setError(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-[68px] right-0 w-[360px] sm:w-[400px] h-[520px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
            style={{ background: "#0e0e0f" }}
          >
            {/* ── Header ─────────────────────────────────── */}
            <div className="px-5 py-4 flex justify-between items-center border-b border-white/10" style={{ background: "#141415" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm" style={{ background: "#008f28" }}>
                  TL
                </div>
                <div>
                  <h3 className="font-bold text-white text-[15px] leading-tight">
                    TOS Lanka AI
                  </h3>
                  <p className="text-[11px] text-white/50 leading-tight">
                    Electronics Manufacturing Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition"
                  title="New conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Chat Messages ──────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: "#0e0e0f" }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-tr-md text-white"
                        : "rounded-2xl rounded-tl-md text-white/90 border border-white/8"
                    }`}
                    style={{
                      background:
                        msg.role === "user" ? "#008f28" : "#1a191b",
                    }}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <div className="prose prose-sm prose-invert max-w-none [&>p]:mb-2 [&>p:last-child]:mb-0 [&_strong]:text-white [&_a]:text-[#3a5bfb] [&_a]:underline [&_li]:text-white/80">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-md flex space-x-1.5 items-center border border-white/8"
                    style={{ background: "#1a191b" }}
                  >
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#008f28", animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#008f28", animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#008f28", animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center text-red-400 text-xs py-2 px-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ───────────────────────────────────── */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-white/10"
              style={{ background: "#141415" }}
            >
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about our services..."
                  disabled={isLoading}
                  maxLength={2000}
                  className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/30 outline-none border border-white/10 focus:border-[#008f28] focus:ring-1 focus:ring-[#008f28]/50 disabled:opacity-40 transition"
                  style={{ background: "#1a191b" }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3 rounded-xl text-white disabled:opacity-30 transition-all hover:brightness-110 active:scale-95"
                  style={{ background: !inputValue.trim() || isLoading ? "#484849" : "#008f28" }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Action Button & Pulse ────────────────────── */}
      <div className="relative">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 1.8 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "#008f28" }}
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-shadow hover:shadow-[0_0_25px_rgba(0,143,40,0.3)]"
          style={{ background: "#008f28" }}
          aria-label="Toggle Chat"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
