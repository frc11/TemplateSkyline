import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the Virtual Concierge for SKYLINE ESTATES, a hyper-luxury real estate firm.
Your tone is sophisticated, architectural, minimalist, and helpful.
You assist clients in finding properties, understanding architectural details, and scheduling viewings.
Keep answers concise and elegant. Do not use emojis. Use professional formatting.
The properties we have are:
1. The Obsidian Penthouse (New York) - $25M - Dark aesthetics, floor-to-ceiling glass.
2. Villa Serenity (Kyoto) - $18M - Traditional japanese minimalist meets modern concrete.
3. Azure Coast Mansion (Monaco) - $45M - Cliffside infinity pool, white marble throughout.
4. Desert Mirror House (Joshua Tree) - $8M - Invisible architecture, sustainable luxury.
`;

export const getGeminiResponse = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct the chat history for the prompt context if needed, 
    // but for simple stateless interaction in this demo, we'll use a direct generateContent 
    // with the history appended as text context or use the Chat API.
    // Here we use the Chat API for maintaining context properly.

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I apologize, I am momentarily unable to access the estate database.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently experiencing a connection issue. Please try again shortly.";
  }
};