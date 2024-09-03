import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// chat history default structure
let chatHistory = [{ role: "user", parts: [{ text: "" }] }];

// safetySettings: Adjust safety settings
// See https://ai.google.dev/gemini-api/docs/safety-settings

// Runs new/recent prompts
async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: chatHistory,
  });

  let result;
  result = await chatSession.sendMessage(prompt);

  chatHistory.push({ role: "user", parts: [{ text: prompt }] });
  chatHistory.push({
    role: "model",
    parts: [{ text: result.response.text() }],
  });

  return result.response.text();
}

// Runs template prompts to provide display-result for card prompts
async function runCard(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  let result;
  result = await chatSession.sendMessage(prompt);
  return result.response.text();
}


// updates history accroding to state
async function geminiHistoryUpdate(history) {
  chatHistory = [{ role: "user", parts: [{ text: "" }] }];
  history.forEach((element) => {
    chatHistory.push({ role: "user", parts: [{ text: element.prompt }] });
    chatHistory.push({
      role: "model",
      parts: [{ text: element.response }],
    });
  });
}


export default { run, runCard, geminiHistoryUpdate };
