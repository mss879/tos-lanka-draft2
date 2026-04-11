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

const WELCOME_MESSAGE = "Hi! 👋 I'm the **TOS Lanka** AI assistant.\n\nHow can I help you with our electronics manufacturing services today?";

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
            className="absolute bottom-[68px] right-0 w-[360px] sm:w-[400px] h-[520px] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden border border-white/20 bg-[#0e0e0f]/80 backdrop-blur-2xl backdrop-saturate-150"
          >
            {/* ── Header ─────────────────────────────────── */}
            <div className="px-5 py-4 flex justify-between items-center border-b border-white/10 bg-white/5 backdrop-blur-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] border border-white/20">
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
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-transparent relative z-0">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-tr-sm text-white bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_4px_12px_rgba(0,186,52,0.25),inset_0_1px_2px_rgba(255,255,255,0.3)] border border-white/20 backdrop-blur-md"
                        : "rounded-2xl rounded-tl-sm text-white/90 bg-white/5 border border-white/10 backdrop-blur-lg"
                    }`}
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
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex space-x-1.5 items-center bg-white/5 border border-white/10 backdrop-blur-lg shadow-sm">
                    <span className="w-2 h-2 rounded-full animate-bounce bg-brand-primary shadow-[0_0_8px_rgba(0,186,52,0.8)]" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce bg-brand-primary shadow-[0_0_8px_rgba(0,186,52,0.8)]" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce bg-brand-primary shadow-[0_0_8px_rgba(0,186,52,0.8)]" style={{ animationDelay: "300ms" }} />
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
              className="p-3 border-t border-white/10 bg-black/20 backdrop-blur-xl relative z-10"
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
                  className="flex-1 px-4 py-3 rounded-xl text-[14px] text-white placeholder:text-white/30 outline-none border border-white/10 bg-black/40 shadow-inner focus:border-brand-primary focus:bg-black/60 focus:ring-1 focus:ring-brand-primary/50 disabled:opacity-40 transition-all font-body"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={`relative overflow-hidden group/send p-3 rounded-xl text-white transition-all disabled:opacity-40 ${
                    !inputValue.trim() || isLoading 
                      ? 'bg-black/40 border border-white/10' 
                      : 'bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_4px_12px_rgba(0,186,52,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)] border border-white/20 active:scale-95'
                  }`}
                >
                  <span className="relative z-10"><Send className="w-4 h-4 drop-shadow-sm" /></span>
                  {inputValue.trim() && !isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover/send:opacity-100 transition-opacity duration-300 z-0"></div>
                  )}
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group/btn z-10 w-[56px] h-[56px] rounded-full flex items-center justify-center text-white transition-all duration-300 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_6px_16px_rgba(0,186,52,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)] border border-white/20 backdrop-blur-md overflow-hidden hover:shadow-[0_8px_25px_rgba(0,186,52,0.4),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)]"
          aria-label="Toggle Chat"
        >
          <span className="relative z-10">
            {isOpen ? <X className="w-6 h-6 drop-shadow-sm" /> : <MessageCircle className="w-6 h-6 drop-shadow-sm" />}
          </span>
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0"></div>
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_rgba(255,255,255,0.3)] z-0"></div>
        </motion.button>
      </div>
    </div>
  );
}
