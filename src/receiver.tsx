import React, { useEffect, useState } from "react";

interface Message {
  content: string;
  timestamp: Date;
}

export default () => {
  const [content, setContent] = useState<Message[]>([]);
  useEffect(() => {
    const ndef = new NDEFReader();
    ndef
      .scan()
      .then(() => {
        console.log("Scan started successfully.");
        ndef.onreadingerror = (event) => {
          console.log("NFC read error:", event);
        };
        ndef.onreading = (event) => {
          const message = event.message;
          const textDecoder = new TextDecoder();
          for (const record of message.records) {
            if (record.recordType === "text") {
              const text = textDecoder.decode(record.data);
              setContent((prev) => [
                ...prev,
                { content: text, timestamp: new Date() },
              ]);
            }
          }
        };
      })
      .catch((error) => console.log("Scan failed to start:", error));
  }, []);
  return (
    <>
      <h1>Messages</h1>
      <div>
        {content.map((msg) => (
          <p>
            <strong>{msg.timestamp.toLocaleTimeString()}</strong>
            {msg.content}
          </p>
        ))}
      </div>
    </>
  );
};
