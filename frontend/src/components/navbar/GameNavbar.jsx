import { Link } from "react-router-dom";
import { useState } from "react";
import "./GameNavbar.css";

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis = Math.floor(ms % 1000);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}:${String(millis).padStart(3, "0")}`;
}

export default function GameNavbar({ elapsed, characters }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="game-navbar">
      <div className="nav-left">
        <Link to={"/"}>
          <h1 className="logo">Where’s Everyone?</h1>
        </Link>
      </div>

      <div className="nav-center">
        <div className="timer">{formatTime(elapsed)}</div>

        <button
          className="characters-toggle"
          onClick={() => setOpen((prev) => !prev)}
        >
          Characters
        </button>

        <div className={`characters ${open ? "open" : ""}`}>
          {characters.map((char) => (
            <div key={char.id} className="character">
              <img
                src={`/characters/${char.name}.png`}
                alt={char.name}
                onError={(e) => (e.currentTarget.src = "/placeholder.png")}
              />
              <p>{char.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </nav>
  );
}
