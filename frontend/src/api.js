export async function startGame() {
  const res = await fetch(`http://localhost:3000/game`, {
    method: "POST",
  });
  const data = await res.json();
  return data.gameId;
}

export async function validateCharacter(gameId, character, x, y) {
  debugger;
  const res = await fetch(`http://localhost:3000/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, character, x, y }),
  });
  return await res.json();
}
