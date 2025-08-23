import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRouter from "./api/routes/auth/auth.routes";
import roomRouter from "./api/routes/room/room.routes";
import requestRouter from "./api/routes/request/request.routes";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js!");
});

app.use(express.json());
app.use(cors());

// Router
app.use("/api/auth", authRouter);
app.use("/api/request", requestRouter);
app.use("/api/room", roomRouter);

// Connection Database
connectDB();

app.listen(PORT, () => {
  console.log(
    `\x1b[33m \x1b[1m \x1b[4mServer running on http://localhost:${PORT}\x1b[0m`
  );
});
