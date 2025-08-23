import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import authRouter from "./api/routes/auth/auth.routes";
import roomRouter from "./api/routes/room/room.routes";
import requestRouter from "./api/routes/request/request.routes";
import userRouter from "./api/routes/user/user.route";

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server for Express
const httpServer = createServer(app);

// Attach Socket.IO
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// --- SOCKET.IO LOGIC ---
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join user to personal room (for direct notifications)
  socket.on("join", (userId: string) => {
    socket.join(userId);
    console.log(`User ${userId} joined personal room`);
  });

  // Send connection request
  socket.on("send_request", ({ senderId, receiverId }) => {
    io.to(receiverId).emit("receive_request", { senderId });
    console.log(`Request from ${senderId} sent to ${receiverId}`);
  });

  // Accept connection request
  socket.on("accept_request", ({ senderId, receiverId }) => {
    io.to(senderId).emit("request_accepted", { receiverId });
    console.log(`Request from ${senderId} accepted by ${receiverId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// --- EXPRESS ROUTES ---
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, TypeScript + Node.js!");
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Router
app.use("/api/auth", authRouter);
app.use("/api/request", requestRouter);
app.use("/api/room", roomRouter);
app.use("/api/user", userRouter);

// Connection Database
connectDB();

// Start Server
httpServer.listen(PORT, () => {
  console.log(
    `\x1b[33m \x1b[1m \x1b[4mServer running on http://localhost:${PORT}\x1b[0m`
  );
});
