import { prisma } from "../lib/prisma.js";
import { Router } from "express";
import {
  getCharacters,
  validateCharacter,
  addScore,
  getScores,
  startGame,
} from "../controllers/gameController.js";

const router = Router();

router.get("/characters", getCharacters);

router.get("/scores", getScores);
router.post("/scores", addScore);

router.post("/game", startGame);

router.post("/validate", validateCharacter);

export { router as gameRouter };
