import ai from "../config/gemini.js";

export const generateEngagingStory = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;
    const prompt = `
    Convert the following travel details into an engaging travel story.

    Title: ${title}
    Location: ${location}
    Date: ${date}
    Traveler notes:
    ${description}
    Write a vivid travel story in 10-15 lines.
    Make it emotional and descriptive.
    `;

    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash",
      contents: prompt,
    });

    const story = response.text;

    res.status(200).json({
      story,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "AI story generation failed",
    });
  }
};


export const chatWithAI = async (req, res) => {
  try {

    const { message } = req.body;

    const prompt = `
    You are Safar AI, a travel assistant for a travel website called Safar.

    Your job is to:
    - Help users with travel destinations
    - Suggest trip ideas
    - Give travel tips
    - Talk about famous places

    You have to answer very politely. If user asks something else then also you have to politely reply. Like if user asks "how are you?" then you have to politly reply "kindly ask questions related to travel". Like this you can give any reply but it should be very polite.
    
    User question:
    ${message}
    `;

    const response = await ai.models.generateContent({
      model: "models/gemini-2.5-flash",
      contents: prompt,
    });

    const reply = response.text;

    res.status(200).json({
      reply,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Chatbot failed",
    });
  }
};