
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateNoteSummary = async (title: string, description: string) => {
  const ai = getAI();
  const prompt = `Analyze this lecture note title and description:
    Title: ${title}
    Description: ${description}
    
    Please provide a concise academic summary (3-4 sentences) and 3 key study questions that a student might find useful for exams.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            studyQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "studyQuestions"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      summary: "AI analysis unavailable at this moment.",
      studyQuestions: ["What are the core concepts mentioned in this topic?"]
    };
  }
};
