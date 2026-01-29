import { createContext } from "react";

export const GameContext = createContext({
  gameId: null,
  setGameId: () => {},
});
