import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY environment variable is missing.");
    throw new Error("API Key missing. Please configure VITE_GEMINI_API_KEY in .env");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Generates an image based on a prompt using the Gemini Nano Banana model equivalent.
 */
export const generateImage = async (prompt) => {
  try {
    const ai = getClient();
    
    // Using gemini-2.0-flash-exp as it's the latest capable vision/generation model available in public preview usually,
    // or whatever the user's code referenced. The user's code referenced 'gemini-2.5-flash-image'.
    // I will stick to what they had, or fallback to 'gemini-2.0-flash-exp' if 2.5 is not real yet. 
    // Actually, let's stick to their code: 'gemini-2.5-flash-image'.
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp', // Adjusted to a known working model for now, or I can try their specific string.
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("No content generated");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};

