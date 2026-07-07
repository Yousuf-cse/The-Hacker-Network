// socket/socketHandler.ts

import { Server, Socket } from "socket.io";
import Message_Bucket from "../models/messages/messages.model";

interface UserRooms {
  [userId: string]: string[]; // a user can be in multiple rooms
}

export const registerSocketHandlers = (io: Server) => {
  const userRooms: UserRooms = {};

  io.on("connection", (socket: Socket) => {
    console.log("🔌 New client connected:", socket.id);

    /** =============== GROUP CHAT =============== */

    // Join group room
    socket.on("join_room", ({ userId, roomId }) => {
      socket.join(roomId);

      if (!userRooms[userId]) userRooms[userId] = [];
      if (!userRooms[userId].includes(roomId)) {
        userRooms[userId].push(roomId);
      }

      console.log(`👥 User ${userId} joined room ${roomId}`);

      // Notify others in room
      socket.to(roomId).emit("user_joined", { userId });

      // Acknowledge to the user
      socket.emit("joined_room", { roomId });
    });

    // Send group message
    socket.on("send_group_message", async ({ roomId, senderId, message }) => {
      try {
        const newMessage = await Message_Bucket.create({
          chat: roomId,
          sender: senderId,
          content: message,
          seenBy: [senderId],
        });

        const populated = await newMessage.populate("sender", "full_name email avatar");

        io.to(roomId).emit("receive_group_message", {
          _id: populated._id,
          chat: populated.chat,
          sender: populated.sender,
          content: populated.content,
          timestamp: (populated as any).createdAt || new Date(),
        });
      } catch (error) {
        console.error("Failed to save or emit room message:", error);
      }
    });

    // Leave group
    socket.on("leave_room", ({ userId, roomId }) => {
      socket.leave(roomId);

      if (userRooms[userId]) {
        userRooms[userId] = userRooms[userId].filter((r) => r !== roomId);
        if (userRooms[userId].length === 0) delete userRooms[userId];
      }

      console.log(`👋 User ${userId} left room ${roomId}`);

      io.to(roomId).emit("user_left", { userId });
      socket.emit("left_room", { roomId });
    });

    /** =============== PERSONAL NOTIFICATIONS =============== */

    // Join personal notification room
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

    /** =============== DISCONNECT =============== */
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};
