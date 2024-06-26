import React from "react";
import styles from "./messages.module.css";

export interface Message {
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export default ({ messages }: { messages: Message[] }) => {
  return (
    <div>
      {messages.map((msg) => (
        <p className={msg.isError ? styles.errorMessage : ""}>
          <strong>{msg.timestamp.toLocaleTimeString()}</strong>
          {msg.content}
        </p>
      ))}
    </div>
  );
};
