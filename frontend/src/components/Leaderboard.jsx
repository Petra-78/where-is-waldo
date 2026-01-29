import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../api";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScores() {
      debugger;
      try {
        const data = await fetchLeaderboard();
        setScores(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadScores();
  }, []);

  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const millis = ms % 1000;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${millis.toString().padStart(3, "0")}`;
  }

  return (
    <div className="leaderboard">
      {loading && <p>Loading leaderboard...</p>}
      <h1>🏆 Leaderboard</h1>

      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Player</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {[...scores]
            .sort((a, b) => a.time - b.time)
            .map((score, index) => (
              <tr key={score.id}>
                <td>{index + 1}</td>
                <td>{score.playerName}</td>
                <td>{formatTime(score.time)}</td>
                <td>
                  {new Date(score.createdAt).toLocaleString("hu-HU", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
