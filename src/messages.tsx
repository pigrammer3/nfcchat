import React from "react";
import "./messages.css";

export interface Message {
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export default ({ messages }: { messages: Message[] }) => {
  return (
    <div>
      {messages.map((msg) => (
        <p className={msg.isError ? "errorMessage" : ""}>
          <strong>{msg.timestamp.toLocaleTimeString()}</strong>
          {msg.content}
        </p>
      ))}
    </div>
  );
};
