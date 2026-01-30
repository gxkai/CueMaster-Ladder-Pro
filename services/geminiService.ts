
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getCoachAdvice(playerName: string, recentPerformance: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a world-class billiards coach. A player named ${playerName} is looking for advice. 
        Their recent performance: ${recentPerformance}. 
        Provide 3 specific tips for their level (one technical, one mental, one strategic). Keep it professional and motivating.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "The coach is currently at the table. Please try again in a few moments!";
    }
  }

  async analyzeMatch(winnerName: string, loserName: string, score: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze a billiards match between ${winnerName} and ${loserName}. The final score was ${score}. 
        Briefly describe what this means for the ladder competition and what the loser should focus on to improve.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Match analysis unavailable.";
    }
  }
}

export const geminiService = new GeminiService();
