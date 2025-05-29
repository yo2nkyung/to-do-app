import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { TodoScreen } from "./components/TodoScreen";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <ThemeProvider>
      {showWelcome ? (
        <WelcomeScreen onStart={() => setShowWelcome(false)} />
      ) : (
        <TodoScreen />
      )}
    </ThemeProvider>
  );
}
