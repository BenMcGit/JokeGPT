import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    
    messages: [
      {
        role: 'system',
        content: `You are an expert at judging the quality of jokes. Given a joke, provide a rating for each of the following three criteria: 1. funny, 2. offensive, and 3. appropriate. Reach rating should be a value between 1 and 5 (decimal is not allowed). Respond with a JSON object in the format: { "funny": "%", "offensive": "%", "appropriate": "%"}, or an empty {} if you are not able to complete the request. Only respond with an object. Here is the joke content to rate: ${prompt}
          
        Output:\n`,
      },
    ],
    frequency_penalty: 1,
    presence_penalty: 1,
    max_tokens: 200,
    temperature: 0.7,
    top_p: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}