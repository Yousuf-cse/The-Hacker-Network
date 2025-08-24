import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";

// Routes
import authRouter from "./api/routes/auth/auth.routes";
import roomRouter from "./api/routes/room/room.routes";
import requestRouter from "./api/routes/request/request.routes";
import userRouter from "./api/routes/user/user.route";
import notificationRouter from "./api/routes/notification/notification.route";

import { registerSocketHandlers } from "./socket/socket";

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins for CORS
const allowedOrigins = ["http://localhost:5173"];

// Express middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// HTTP server
const httpServer = createServer(app);

// Socket.IO instance
export const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Register socket logic
registerSocketHandlers(io);

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("✅ Server is running. Welcome to the API!");
});

app.use("/api/auth", authRouter);
app.use("/api/request", requestRouter);
app.use("/api/room", roomRouter);
app.use("/api/user", userRouter);
app.use("/api/notification", notificationRouter);

// DB connection
connectDB();

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
});
