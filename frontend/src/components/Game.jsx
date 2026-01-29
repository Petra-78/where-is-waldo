import { useRef, useState, useEffect } from "react";
import image from "/where-is-waldo.jpeg";
import Target from "./Target";
import { useContext } from "react";
import { GameContext } from "../context/gameContext";
import { startGame } from "../api";

export default function Game() {
  const [coordinates, setCoordinates] = useState(null);
  const [showTargetBox, setShowTargetBox] = useState(null);
  const imageRef = useRef(null);
  const { gameId, setGameId } = useContext(GameContext);
  useEffect(() => {
    async function initGame() {
      const id = await startGame();
      setGameId(id);
    }

    initGame();
  }, []);

  async function handleImageClick(e) {
    const rect = imageRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // debugger;
    if (coordinates && showTargetBox) {
      setCoordinates(null);
      setShowTargetBox(false);
    } else {
      setCoordinates({ x, y });
      setShowTargetBox(true);
    }
  }
  useEffect(() => {
    console.log("STATE CHANGED:", coordinates, showTargetBox);
  }, [coordinates, showTargetBox]);

  return (
    <div
      className="main"
      onClick={() => {
        setShowTargetBox(!showTargetBox);
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          width: "90%",
        }}
      >
        <img
          ref={imageRef}
          src={image}
          alt="Where is Waldo"
          onClick={handleImageClick}
          style={{
            width: "100%",
            display: "block",
            cursor: "crosshair",
            zIndex: "999",
          }}
        />
        {showTargetBox && coordinates && (
          <Target x={coordinates.x} y={coordinates.y} />
        )}
      </div>
    </div>
  );
}
