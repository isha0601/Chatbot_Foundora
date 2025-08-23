import { Router } from "express";
import { ensureSession, appendUserMessage, getMessages, appendAssistantMessage } from "../services/store.js";
import { appGraph } from "../services/graph.js";

const router = Router();

/**
 * POST /api/chat
 * body: { sessionId?: string, message: string }
 * returns: { reply: string, sessionId: string }
 */
router.post("/", async (req, res) => {
  try {
    const { sessionId: inSessionId, message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message (string) is required" });
    }

    const sessionId = ensureSession(inSessionId);
    appendUserMessage(sessionId, message);

    // Current state (messages so far)
    const state = { messages: getMessages(sessionId) };

    // Invoke the LangGraph app
    const result = await appGraph.invoke(state);

    // result.messages contains the new assistant message appended by graph node
    const last = result.messages[result.messages.length - 1];
    const replyText = typeof last?.content === "string"
      ? last.content
      : (Array.isArray(last?.content) ? last.content.map(c => c.text || "").join("\n") : "");

    appendAssistantMessage(sessionId, replyText);

    return res.json({ reply: replyText, sessionId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
