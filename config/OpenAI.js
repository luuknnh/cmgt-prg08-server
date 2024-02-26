import { ChatOpenAI } from "@langchain/openai";

import llmOutputStore from "../stores/llmOutputStore.js";

// Temperature on 0 because we want to prioritize accuracy and relevance
// for answering D&D-related questions. By setting the temperature to 0,
// the model will select the most likely predictions based on the training data,
// ensuring that the answers provided are precise and consistent.

const model = new ChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
  azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
  maxRetries: 3,
  temperature: 0,
  callbacks: [
    {
      handleLLMEnd(output) {
        llmOutputStore.set(output.llmOutput);
      },
    },
  ],
});

export default model;
