import React from "react";
import { createRoot } from "react-dom/client";

import Receiver from "./receiver";

const App = () => {
  return (
    <>
      <div>NFC Chat</div>
      <Receiver />
    </>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
