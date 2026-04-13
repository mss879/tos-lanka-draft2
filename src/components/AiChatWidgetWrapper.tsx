"use client";

import dynamic from "next/dynamic";

export const AiChatWidget = dynamic(
  () => import("./ai-chat-widget").then((mod) => mod.AiChatWidget),
  { ssr: false }
);
