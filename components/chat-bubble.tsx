import Rating from "./rating";

export default function ChatBubble(props: {
  isUser: boolean;
  message: string;
  key: number;
}) {
  const { isUser, message, key } = props;

  const location = isUser ? "chat chat-start" : "chat chat-end";
  const bubble = isUser
    ? "chat-bubble bg-orange-400 text-white flex flex-col"
    : "chat-bubble bg-slate-400 text-white flex flex-col";
  
  return (
    <div className={location}>
      <div className="avatar chat-image">
        <div className="w-10 rounded-full">
          <img
            alt={isUser ? "User" : "Chatbot"}
            src={isUser ? "/laugh.jpeg" : "/mic.jpg"}
          />
        </div>
      </div>
      <div className={bubble}>
        {message}
        {!isUser ?
          <Rating joke={message} /> :
          <></>
        }
      </div>
    </div>
  );
}
