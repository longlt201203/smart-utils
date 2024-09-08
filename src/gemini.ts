import { GoogleGenerativeAI } from "@google/generative-ai";
import { Env } from "./env";

const genAI = new GoogleGenerativeAI(Env.GOOGLE_GEMINI_API_KEY);
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a chatbot that answer user's prompt in plain text format.",
});
