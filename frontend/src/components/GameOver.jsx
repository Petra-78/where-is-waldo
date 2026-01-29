import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { addScore } from "../api";
import { GameContext } from "../context/gameContext";

export function GameOver({ setShowPopup, elapsedTime }) {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const { gameId } = useContext(GameContext);

  async function handleSubmitScore() {
    if (!playerName) return;

    try {
      await addScore(gameId, playerName, elapsedTime);
      setShowPopup(false);
      navigate("/leaderboard");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="popupWrapper">
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>Game Over!</h2>
        <p>Enter your name for the leaderboard:</p>
        <input
          type="text"
          placeholder="Your name"
          max={30}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={handleSubmitScore}>Submit</button>
      </div>
    </div>
  );
}
