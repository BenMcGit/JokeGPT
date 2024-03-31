import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const prompts = [
    {
      role: "system",
      content:
        "You are a jokester and love to make people laugh.",
    },
  ];

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [{
        role: "system",
        content:
          "You are a jokester and love to make people laugh.",
      }, ...messages],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
