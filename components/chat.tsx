"use client";

import { useChat } from "ai/react";
import ChatContainer from "./chat-container";
import { SetStateAction, useState } from "react";

const TYPES = [
  "Knock-knock",
  "Pun",
  "Story",
]

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

const Dropdown = (props: { 
  options: string[], 
  value: string, 
  title: string, 
  setValue: (value: SetStateAction<string>) => void
}) => {
  const { options, value, title, setValue} = props;

  return (
    <div className="form-control col-span-2">
      <label className="label">
        <span className="label-text">{title}</span>
      </label>
      <select
        className="select"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map(op => <option>{op}</option>)}
      </select>
    </div>
  )
};

export default function Chat() {
  const temperatureMin = 0;
  const temperatureMax = 100;
  const [topic, setTopic] = useState(TOPICS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [type, setType] = useState(TYPES[0]);
  const [temperature, setTemperature] = useState("50");

  const {
    messages,
    handleSubmit,
    isLoading,
    append,
  } = useChat();

  return (
    <div className="p-16">
      <div className="w-full h-64">
        <form onSubmit={handleSubmit} className="bg-orange-400 rounded-xl shadow-md px-8 pt-6 pb-8 mb-4 grid grid-cols-4 gap-4">
          <Dropdown options={TYPES} value={type} title={"Type"} setValue={setType} />
          <Dropdown options={TOPICS} value={topic} title={"Topic"} setValue={setTopic} />
          <Dropdown options={TONES} value={tone} title={"Tone"} setValue={setTone} />
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Temperature</span>
            </label>
            <input
            className="range range-xs col-span-4 "
            type="range" 
            min={temperatureMin} 
            max={temperatureMax}
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}/>
          </div>
          <button 
            className="btn col-span-4 bg-blue-500 text-white"
            disabled={isLoading}
            onClick={() =>
              append({ role: "user", content: `Generate a joke using the topic ${topic} and have a tone ${tone} while delivering it. Also consider the temperature value ${temperature}. This value can be a number between ${temperatureMin} and ${temperatureMax}. When the value is ${temperatureMin} the joke will be extremely random. When the value is ${temperatureMax} the joke will very clear.` })
            }>
              Generate Joke!
          </button>
          {messages && messages.length > 0 ?       
            <ChatContainer
                messages={messages}
                isLoading={isLoading}
              /> : 
              <></>
          }
        </form>
      </div>
    </div>
  );
}
