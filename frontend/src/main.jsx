import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import routes from "./routes";
import { GameContext } from "./context/gameContext";

const router = createBrowserRouter(routes);

function Root() {
  const [gameId, setGameId] = useState(null);

  return (
    <GameContext.Provider value={{ gameId, setGameId }}>
      <RouterProvider router={router} />
    </GameContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
