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

let chatHistory = [{ role: "user", parts: [{ text: "" }] }];

// safetySettings: Adjust safety settings
// See https://ai.google.dev/gemini-api/docs/safety-settings
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

  //console.log(chatSession._history);

  return result.response.text();
}

async function runCard(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  let result;

  result = await chatSession.sendMessage(prompt);

  return result.response.text();
}

export default { run, runCard };
