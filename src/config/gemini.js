import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Directly assigning the API key
const apiKey = "your_api_key";
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Asynchronous function to run the chat prompt
async function run(prompt) {
  try {
    // Start a chat session
    const chatSession = model.startChat({
      generationConfig,
      // You can adjust safety settings here
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [], // Optionally maintain conversation history
    });

    // Send the prompt to the model and wait for the response
    const result = await chatSession.sendMessage(prompt);

    // result.response.text()

    // console.log(result.response.text());

    return result.response.text();
  } catch (error) {
    console.error(error);
  }
}

export default run;
