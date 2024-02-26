import express from "express";

import model from "../config/OpenAI.js";
import addToChatHistory from "../helpers/Chat/ChatHistory.js";
import applyPromptEngineering from "../helpers/Prompts/PromptEngineering.js";
import llmOutputStore from "../stores/llmOutputStore.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { query, chatHistory } = req.body;

    if (!query) {
      return res.status(400).json({ error: "A query is required" });
    }

    // Parsing chatHistory if it's a string
    // Initialize as an empty array if it doesn't exist
    const parsedChatHistory = chatHistory
      ? typeof chatHistory === "string"
        ? JSON.parse(chatHistory)
        : chatHistory
      : [];

    const improvedQuery = await applyPromptEngineering(query);

    addToChatHistory("human", query, parsedChatHistory, improvedQuery);

    const response = await model.invoke(parsedChatHistory);

    const formattedResponse = response.content.replace(/\n/g, " ");

    const llmOutput = llmOutputStore.get();

    addToChatHistory("ai", formattedResponse, parsedChatHistory);

    res.json({
      response: formattedResponse,
      chatHistory: parsedChatHistory,
      llmOutput,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      error: "A problem occurred while processing the request.",
      errorDetails: error,
    });
  }
});

export default router;
