import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function chatWithGroq(messages: Array<{role: string; content: string}>) {
  try {
    console.log("Calling OpenRouter with model: meta-llama/llama-3.1-8b-instruct:free");
    const response = await openai.chat.completions.create({
      messages: messages as any,
      model: "meta-llama/llama-3.1-8b-instruct:free",
      temperature: 0.7,
      max_tokens: 1024,
    });
    console.log("OpenRouter response received");
    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("OpenRouter API error:", error);
    const err = error as any;
    const errorMessage = err?.message || err?.error?.message || 'Unknown error';
    throw new Error(`OpenRouter API failed: ${errorMessage}`);
  }
}