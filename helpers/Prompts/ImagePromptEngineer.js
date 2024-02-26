import { PromptTemplate } from "@langchain/core/prompts";

import OpenAIConfig from "../../config/OpenAI.js";

const { model } = OpenAIConfig;

async function ImagePromptEngineering(imagePrompt) {
  const promptEngineeringTemplate = new PromptTemplate({
    inputVariables: ["imagePrompt"],
    template:
      "Please refine the following prompt to generate create or make an image. don't change the question. only more detailed descirption for a better image: '{imagePrompt}'. Only send the refined prompt back.",
  });

  try {
    // Generate the prompt using the question asked by the user
    const prompt = await promptEngineeringTemplate.format({ imagePrompt });

    // Ask the model to improve the question
    const improvedImagePrompt = await model.invoke(prompt);

    // Return the improved question
    return improvedImagePrompt.content;
  } catch (error) {
    console.error(
      "An error occurred while applying prompt engineering:",
      error
    );
    // In case of an error, return the original imagePrompt
    return imagePrompt;
  }
}

export default ImagePromptEngineering;
