import { Link } from "react-router-dom";
import "./GameNavbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to={"/"}>
          <h1 className="logo">Where’s Everyone?</h1>
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </nav>
  );
}
