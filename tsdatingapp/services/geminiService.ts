
import { GoogleGenAI, Type } from "@google/genai";

// Always use named parameter and process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBio = async (traits: string[]): Promise<string> => {
  try {
    // Using gemini-3-flash-preview for text generation task
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, engaging dating profile bio (max 3 sentences) for a transgender/non-binary person based on these interests: ${traits.join(', ')}. Keep it positive, safe, and authentic.`,
    });
    // Use .text property directly
    return response.text || "Just being me! Looking for connection.";
  } catch (error) {
    console.error("Gemini Bio Generation Error:", error);
    return "Exploring life and looking for meaningful connections.";
  }
};

export const checkMessageSafety = async (text: string): Promise<{ safe: boolean; reason?: string }> => {
  try {
    // Using gemini-3-flash-preview for safety analysis task
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this message for a dating app context for safety and harassment. Is it harmful, transphobic, or aggressive? Message: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            safe: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ["safe"]
        }
      }
    });
    // Use .text property directly
    const result = JSON.parse(response.text || '{"safe": true}');
    return result;
  } catch (error) {
    console.error("Safety check error:", error);
    return { safe: true };
  }
};
