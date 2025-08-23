import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph, START, END, MessagesAnnotation } from "@langchain/langgraph";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️  GEMINI_API_KEY is not set in backend/.env");
}

// LangChain model (Gemini)
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: "gemini-1.5-flash", // or "gemini-1.5-pro"
  // safetySettings, generationConfig can be added here
});

// Single node that calls the model with the current messages array.
// It returns { messages: [AssistantMessage] } which LangGraph merges.
const modelNode = async (state) => {
  // state.messages is an array of BaseMessage (user/ai/system)
  const response = await model.invoke(state.messages);
  // Return delta messages that should be appended to state
  return { messages: [response] };
};

// Build the graph with Message-aware state
const graph = new StateGraph(MessagesAnnotation)
  .addNode("model", modelNode)
  .addEdge(START, "model")
  .addEdge("model", END);

export const appGraph = graph.compile();
