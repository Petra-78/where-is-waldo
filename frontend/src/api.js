export async function startGame() {
  const res = await fetch(`http://localhost:3000/game`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to start game");
  }

  const data = await res.json();

  return data.gameId;
}

export async function validateCharacter(gameId, character, x, y) {
  const res = await fetch(`http://localhost:3000/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, character, x, y }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return await res.json();
}

export async function fetchCharacters() {
  const res = await fetch("http://localhost:3000/characters");

  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }

  return res.json();
}
