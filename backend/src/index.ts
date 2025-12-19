import "dotenv/config";
import cors from "cors";
import express from "express";
import playerRoutes from "./routes/playerRoutes.ts";
import scoreboardRoutes from "./routes/scoreboardRoutes.ts";
const port: number = 3000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", playerRoutes);
app.use("/api", scoreboardRoutes);

app.listen(port, () => {
  console.log(
    `Webbtjänsten kan nu ta emot anrop på http://localhost:${port}/api`,
  );
});
