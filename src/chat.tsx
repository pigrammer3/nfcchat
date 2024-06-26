import React, { useEffect, useState } from "react";

import Messages, { Message } from "./messages";

export default () => {
  const [content, setContent] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const addError = (error: string) => {
    setContent((prev) => [
      ...prev,
      { content: `Error: ${error}`, timestamp: new Date(), isError: true },
    ]);
  };
  useEffect(() => {
    const ndef = new NDEFReader();
    ndef
      .scan()
      .then(() => {
        addError("Scan started.");
        ndef.onreadingerror = (event) => {
          addError("NFC read error: " + event);
        };
        ndef.onreading = (event) => {
          const message = event.message;
          addError(message.toString());
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
      .catch((error) => addError("Scan failed: " + error));
  }, []);
  const sendMessage = () => {
    const ndef = new NDEFReader();
    ndef
      .write(message)
      .then(() => {
        console.log("Message written.");
        setMessage("");
        setContent((prev) => [
          ...prev,
          { content: message, timestamp: new Date() },
        ]);
      })
      .catch((error) => addError("Write failed: " + error));
  };
  return (
    <>
      <input
        id="msgInput"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button id="sendButton" onClick={sendMessage}>
        Send
      </button>
      <h1>Messages</h1>
      <Messages messages={content} />
    </>
  );
};
