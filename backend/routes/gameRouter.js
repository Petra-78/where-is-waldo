import { prisma } from "../lib/prisma.js";
import { Router } from "express";
import {
  getCharacters,
  validateCharacter,
} from "../controllers/gameController.js";

const router = Router();

router.get("/characters", getCharacters);

router.post("/game", async (req, res) => {
  try {
    const game = await prisma.game.create({});
    res.json({ gameId: game.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/validate", validateCharacter);

export { router as gameRouter };
