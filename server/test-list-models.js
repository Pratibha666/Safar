import ai from "../server/config/gemini.js";

async function listModels() {
  try {
    const models = await ai.models.list();
    console.log("Available models for API key:");
    console.log(models);
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();