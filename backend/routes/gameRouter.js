import { prisma } from "../lib/prisma.js";
import { Router } from "express";

const router = Router();

router.post("/game", async (req, res) => {
  debugger;
  try {
    const game = await prisma.game.create({});
    res.json({ gameId: game.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/validate", async (req, res) => {
  debugger;
  const { gameId, character, x, y } = req.body;

  if (!gameId || !character || x == null || y == null)
    return res.status(400).json({ error: "Missing data" });

  try {
    const char = await prisma.characters.findUnique({
      where: { name: character },
    });
    if (!char) return res.status(404).json({ error: "Character not found" });

    const found = await prisma.foundCharacter.findUnique({
      where: { gameId_characterId: { gameId, characterId: char.id } },
    });
    if (found) return res.json({ correct: false, message: "Already found" });

    const isCorrect =
      x >= char.xMin && x <= char.xMax && y >= char.yMin && y <= char.yMax;

    if (isCorrect) {
      await prisma.foundCharacter.create({
        data: { gameId, characterId: char.id },
      });
    }

    res.json({
      correct: isCorrect,
      character,
      position: isCorrect ? { x, y } : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export { router as gameRouter };
