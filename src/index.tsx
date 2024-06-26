import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return <div>NFC Chat</div>;
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
