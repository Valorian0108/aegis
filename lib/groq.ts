import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function chatWithGroq(messages: Array<{role: string; content: string}>) {
  try {
    const response = await groq.chat.completions.create({
      messages,
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 1024,
    });
    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq API error:", error);
    throw new Error("Failed to get response from AI");
  }
}