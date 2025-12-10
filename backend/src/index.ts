import cors from "cors";
import express from "express";
import playerRoutes from "./routes/playerRoutes.ts";
// import sessionRoutes from "./routes/sessionRoutes.ts";
const port: number = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", playerRoutes);
// app.use("/api", sessionRoutes);

app.listen(port, () => {
  console.log(
    `Webbtjänsten kan nu ta emot anrop på http://localhost:${port}/api`,
  );
});
