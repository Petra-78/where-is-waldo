import { Link } from "react-router";
import Navbar from "../components/navbar/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home-background">
        <div className="home-container">
          <img src="/where-is-waldo.jpeg" alt="where-is-everyone" />
          <h1>City of Animals</h1>
          <Link to="/game">
            <button className="start-game-btn">Start Game</button>
          </Link>
        </div>
      </div>
    </>
  );
}
