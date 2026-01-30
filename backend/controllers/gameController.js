import { prisma } from "../lib/prisma.js";

export async function startGame(req, res) {
  try {
    const game = await prisma.game.create({});
    res.json({ gameId: game.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function validateCharacter(req, res) {
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
}

export function randomizeCharacters() {
  const result = [];

  while (result.length < 3) {
    const num = Math.floor(Math.random() * 30) + 1;

    if (!result.includes(num)) {
      result.push(num);
    }
  }

  return result;
}

export async function getCharacters(req, res) {
  const ids = randomizeCharacters();
  const characters = await prisma.characters.findMany({
    where: {
      OR: [
        {
          id: ids[0],
        },
        {
          id: ids[1],
        },
        {
          id: ids[2],
        },
      ],
    },
  });

  res.json(characters);
}

export async function addScore(req, res) {
  debugger;
  const { gameId, name, time } = req.body;

  try {
    const score = await prisma.score.create({
      data: {
        playerName: name,
        time: time,
        gameId: gameId,
      },
    });
    res.json(score);
  } catch (err) {
    console.log(err);
  }
}

export async function getScores(req, res) {
  debugger;
  const scores = await prisma.score.findMany({
    orderBy: {
      time: "asc",
    },
  });

  res.json(scores);
}
