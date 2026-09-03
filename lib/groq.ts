import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function chatWithGroq(messages: Array<{role: string; content: string}>) {
  try {
    console.log("Calling Groq with model: llama-3.1-8b-instant");
    const response = await groq.chat.completions.create({
      messages: messages as any,
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 1024,
    });
    console.log("Groq response received");
    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq API error:", error);
    const err = error as any;
    const errorMessage = err?.message || err?.error?.message || 'Unknown error';
    throw new Error(`Groq API failed: ${errorMessage}`);
  }
}