import {GoogleGenerativeAI} from "@google/generative-ai";

const genai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genai.getGenerativeModel({'model' : 'gemini-2.5-flash'});

export default async function GenerateContent(prompt) {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
};