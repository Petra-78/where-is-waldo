import express from "express";
import cors from "cors";
import "dotenv/config";
import { gameRouter } from "./routes/gameRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", gameRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
