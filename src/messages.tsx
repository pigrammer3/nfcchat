import React from "react";

export interface Message {
  content: string;
  timestamp: Date;
}

export default ({ messages }: { messages: Message[] }) => {
  return (
    <div>
      {messages.map((msg) => (
        <p>
          <strong>{msg.timestamp.toLocaleTimeString()}</strong>
          {msg.content}
        </p>
      ))}
    </div>
  );
};
