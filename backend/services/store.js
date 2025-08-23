import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { randomUUID } from "crypto";

/**
 * Simple in-memory session store for demo purposes.
 * In production, swap with Redis/Postgres/etc.
 */
const sessions = new Map();

/** Ensure a session exists; return sessionId */
export function ensureSession(sessionId) {
  const id = sessionId || randomUUID();
  if (!sessions.has(id)) {
    sessions.set(id, { messages: [] });
  }
  return id;
}

export function getMessages(sessionId) {
  const s = sessions.get(sessionId);
  return s?.messages ?? [];
}

export function appendUserMessage(sessionId, text) {
  const s = sessions.get(sessionId);
  s.messages.push(new HumanMessage(text));
}

export function appendAssistantMessage(sessionId, text) {
  const s = sessions.get(sessionId);
  s.messages.push(new AIMessage(text));
}
