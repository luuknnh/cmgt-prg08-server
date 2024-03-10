import express from "express";

import OpenAIConfig from "../config/OpenAI.js";
import addToChatHistory from "../helpers/Chat/ChatHistory.js";
import ImagePromptEngineering from "../helpers/Prompts/ImagePromptEngineer.js";
import applyPromptEngineering from "../helpers/Prompts/PromptEngineering.js";
import llmOutputStore from "../stores/llmOutputStore.js";

const router = express.Router();
const { model, client, modelForCheckingImage } = OpenAIConfig;

/**
 * POST /chat
 * Processes the chat request, checks if an image is requested, generates the image if needed,
 * and returns the AI's response along with the image URL.
 *
 * @param {string} req.body.query - The user's chat message
 * @param {Array} req.body.chatHistory - The chat history between the user and the AI
 *
 * @returns {Object} The response object containing:
 * - {string} response: The AI's response to the user's message
 * - {Array} chatHistory: The updated chat history
 * - {Object} llmOutput: The output from the last language model
 * - {string} imageUrl: The URL of the generated image (if an image was requested)
 *
 * @throws {400} If the query is not provided in the request body
 * @throws {500} If an error occurs while processing the request
 */
router.post("/chat", async (req, res) => {
  console.log("POST /chat called");
  try {
    const { query, chatHistory } = req.body;
    console.log("Received query: ", query);

    if (!query) {
      console.log("Error: A query is required");
      return res.status(400).json({ error: "A query is required" });
    }

    let imageUrl = undefined;
    let improvedQuery = query;

    const parsedChatHistory = chatHistory
      ? typeof chatHistory === "string"
        ? JSON.parse(chatHistory)
        : chatHistory
      : [];

    console.log("Checking if image is requested...");
    const imageChecker = await modelForCheckingImage.invoke(
      `Is the following question requesting to generate, create or make an image? Please respond with 'yes' or 'no'. The question is: ${query}`
    );

    if (imageChecker.content.trim().toLowerCase().includes("yes.")) {
      console.log("Image requested. Generating image...");
      const improvedImagePrompt = await ImagePromptEngineering(query);
      console.log(
        "Prompt engineering for image applied: ",
        improvedImagePrompt
      );
      // const response = await client.images.generate({
      //   model: "dall-e-3",
      //   prompt: improvedImagePrompt,
      //   n: 1,
      //   size: "1024x1792",
      // });
      // imageUrl = response.data;
      // //! Temporary image URL for live version on Vercel
      imageUrl = "https://picsum.photos/200/300";
      improvedQuery = improvedImagePrompt;
      console.log("Image generated", imageUrl);
    } else if (imageChecker.content.trim().toLowerCase().includes("no.")) {
      console.log("No image requested. Applying prompt engineering...");
      const newImprovedQuery = await applyPromptEngineering(query);
      improvedQuery = newImprovedQuery;
      imageUrl = null;
      console.log("Prompt engineering applied: ", improvedQuery);
    }

    addToChatHistory("human", query, parsedChatHistory, improvedQuery);

    let formattedResponse = "";
    if (!imageUrl) {
      console.log("Getting AI response...");
      const response = await model.invoke(parsedChatHistory);
      formattedResponse = response.content.replace(/\n/g, " ");
      addToChatHistory("ai", formattedResponse, parsedChatHistory);
      console.log("AI response: ", formattedResponse);
    }

    const llmOutput = llmOutputStore.get();

    console.log("Sending response...");
    res.json({
      response: formattedResponse,
      chatHistory: parsedChatHistory,
      llmOutput,
      imageUrl,
    });
    console.log("Response sent.");
  } catch (error) {
    console.log("Error occurred: ", error);
    res.status(500).json({
      error: "A problem occurred while processing the request.",
      errorDetails: error,
    });
  }
});

export default router;
