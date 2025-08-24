// socket/socketHandler.ts

import { Server, Socket } from "socket.io";

export const registerSocketHandlers = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("🔌 New client connected:", socket.id);

    // Join user's personal notification room
    socket.on("join", (userId: string) => {
      socket.join(userId);
      console.log(`👤 User ${userId} joined personal room`);
    });

    // Send a connection request
    socket.on("send_request", ({ senderId, receiverId }) => {
      io.to(receiverId).emit("receive_request", { senderId });
      console.log(`📨 Request from ${senderId} sent to ${receiverId}`);
    });

    // Accept a connection request
    socket.on("accept_request", ({ senderId, receiverId }) => {
      io.to(senderId).emit("request_accepted", { receiverId });
      console.log(`✅ Request from ${senderId} accepted by ${receiverId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};
