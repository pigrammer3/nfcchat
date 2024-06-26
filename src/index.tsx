import React from "react";
import { createRoot } from "react-dom/client";

import Chat from "./chat";

const App = () => {
  return (
    <>
      <div>NFC Chat</div>
      <Chat />
    </>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
