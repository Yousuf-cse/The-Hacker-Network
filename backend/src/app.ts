import express, { Request, Response } from "express";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
