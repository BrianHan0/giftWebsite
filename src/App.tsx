import { useState } from "react";
import LockScreen from "./screens/LockScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return isUnlocked ? (
    <HomeScreen />
  ) : (
    <LockScreen onUnlock={() => setIsUnlocked(true)} />
  );
}
