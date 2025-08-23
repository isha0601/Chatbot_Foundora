import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "../routes/chat.js";
import { log } from "../utils/logger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// Chat API
app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => log(`🚀 Backend listening at http://localhost:${PORT}`));
