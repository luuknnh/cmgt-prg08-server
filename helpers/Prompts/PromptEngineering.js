import { PromptTemplate } from "@langchain/core/prompts";

import model from "../../config/OpenAI.js";

async function applyPromptEngineering(question) {
  const promptEngineeringTemplate = new PromptTemplate({
    inputVariables: ["question"],
    template:
      "Please improve the following question: '{question}'.Only send the improved question back.",
  });
  // ? like a treasure full of knowledge Dungeons and Dragons 5e questions

  try {
    // Generate the prompt using the question asked by the user
    const prompt = await promptEngineeringTemplate.format({ question });

    // Ask the model to improve the question
    const improvedQuestion = await model.invoke(prompt);

    // Return the improved question
    return improvedQuestion.content;
  } catch (error) {
    console.error(
      "An error occurred while applying prompt engineering:",
      error
    );
    // In case of an error, return the original question
    return question;
  }
}

export default applyPromptEngineering;
