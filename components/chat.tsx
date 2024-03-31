"use client";

import { useChat } from "ai/react";
import ChatContainer from "./chat-container";
import { useState } from "react";


const TOPICS = [
  "Politics",
  "Movies",
  "Science",
  "Artificial Intelligence",
]

const TONES = [
  "Witty",
  "Sarcastic",
  "Silly",
  "Dark",
  "Goofy",
]

export default function Chat() {
  const temperatureMin = 0;
  const temperatureMax = 100;
  const [topic, setTopic] = useState(TOPICS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [temperature, setTemperature] = useState("50");

  const {
    messages,
    handleSubmit,
    isLoading,
    append,
  } = useChat();

  return (
    <div className="flex flex-col p-32">
      <div className="w-full h-64">
        <form onSubmit={handleSubmit} className="bg-orange-400 rounded-xl shadow-md px-8 pt-6 pb-8 mb-4 grid grid-cols-4 gap-4">
          <select
            className="select select-bordered col-span-2"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {TOPICS.map(topic => <option>{topic}</option>)}
          </select>
          <select
            className="select select-bordered col-span-2"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            {TONES.map(tone => <option>{tone}</option>)}
          </select>
          <input
            className="range range-xs col-span-4 "
            type="range" 
            min={temperatureMin} 
            max={temperatureMax}
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}/>
          <button 
            className="btn col-span-4 bg-blue-500 text-white"
            onClick={() =>
              append({ role: "user", content: `Generate a joke using the topic ${topic} and have a tone ${tone} while delivering it. Also consider the temperature value ${temperature}. This value can be a number between ${temperatureMin} and ${temperatureMax}. When the value is ${temperatureMin} the joke will be extremely random. When the value is ${temperatureMax} the joke will very clear.` })
            }>
              Generate Joke!
          </button>
        </form>
      </div>
      {messages && messages.length > 0 ?       
        <ChatContainer
            messages={messages}
            isLoading={isLoading}
          /> : 
          <></>
      }
    </div>
  );
}
