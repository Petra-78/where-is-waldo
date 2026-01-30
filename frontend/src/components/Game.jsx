import { useRef, useState, useEffect } from "react";
import image from "/where-is-waldo.jpeg";
import Target from "./Target";
import { useContext } from "react";
import { GameContext } from "../context/gameContext";
import { fetchCharacters, startGame } from "../api";
import Timer from "./Timer";
import { GameOver } from "./GameOver";
import GameNavbar from "./navbar/GameNavbar";
import "./Game.css";

export default function Game() {
  const [coordinates, setCoordinates] = useState(null);
  const [showTargetBox, setShowTargetBox] = useState(null);
  const imageRef = useRef(null);
  const [characters, setCharacters] = useState(null);
  const { gameId, setGameId } = useContext(GameContext);
  const [markers, setMarkers] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    function checkGameFinish() {
      if (characters && characters.length === 0) {
        setTimerActive(false);
        setShowPopup(true);
      } else return;
    }
    checkGameFinish();
  }, [characters]);

  useEffect(() => {
    async function initGame() {
      try {
        const id = await startGame();
        const fetchedCharacters = await fetchCharacters();
        console.log("FETCHED:", fetchedCharacters);
        setCharacters(fetchedCharacters);
        setGameId(id);
      } catch (err) {
        console.error(err);
      }
    }

    initGame();
  }, []);

  useEffect(() => {
    if (!timerActive) return;

    const startTime = Date.now() - elapsed;

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 10);

    return () => clearInterval(interval);
  }, [timerActive]);

  async function handleImageClick(e) {
    console.log(characters);
    const rect = imageRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

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
    <>
      {characters && <GameNavbar elapsed={elapsed} characters={characters} />}

      <main className="game">
        {showPopup && (
          <GameOver setShowPopup={setShowPopup} elapsedTime={elapsed} />
        )}

        <div className="game-stage">
          <img
            ref={imageRef}
            src={image}
            alt="Where is Waldo"
            onClick={handleImageClick}
            className="game-image"
          />
          <div className="attribute">Art by Tom Kilian</div>

          {markers.map((marker, i) => (
            <div
              key={i}
              className="marker"
              style={{
                left: `${marker.x * 100}%`,
                top: `${marker.y * 100}%`,
              }}
            >
              <img src="/mark.png" alt={marker.name} />
            </div>
          ))}

          {showTargetBox && coordinates && characters && (
            <Target
              x={coordinates.x}
              y={coordinates.y}
              characters={characters}
              setCharacters={setCharacters}
              setMarkers={setMarkers}
            />
          )}
        </div>
      </main>
    </>
  );
}
