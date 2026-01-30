export async function startGame() {
  const res = await fetch(
    `https://where-is-waldo-production-9c9b.up.railway.app/game`,
    {
      method: "POST",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to start game");
  }

  const data = await res.json();

  return data.gameId;
}

export async function validateCharacter(gameId, character, x, y) {
  const res = await fetch(
    `https://where-is-waldo-production-9c9b.up.railway.app/validate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, character, x, y }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return await res.json();
}

export async function fetchCharacters() {
  const res = await fetch(
    "https://where-is-waldo-production-9c9b.up.railway.app/characters",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return res.json();
}

export async function addScore(gameId, name, time) {
  const res = await fetch(
    `https://where-is-waldo-production-9c9b.up.railway.app/scores`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, name, time }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return res.json();
}

export async function fetchLeaderboard() {
  debugger;
  const res = await fetch(
    "https://where-is-waldo-production-9c9b.up.railway.app/scores",
  );
  if (!res.ok) throw new Error("Failed to fetch leaderboard");
  return res.json();
}
