import { Request, Response } from "express";
import Message_Bucket from "../../../models/messages/messages.model";

// Send a new chat message
export const sendMessage = async (req: Request, res: Response) => {
  const { roomId, senderId, content } = req.body;

  if (!roomId || !senderId || !content) {
    return res.status(400).json({
      error: "roomId, senderId, and content are required.",
    });
  }

  try {
    const newMessage = await Message_Bucket.create({
      chat: roomId,
      sender: senderId,
      content,
      seenBy: [senderId],
    });

    const populated = await newMessage.populate("sender", "full_name email avatar");

    return res.status(201).json({
      success: true,
      message: populated,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to send message.",
      details: error.message,
    });
  }
};

// Fetch all messages in a specific room
export const getRoomMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  if (!roomId) {
    return res.status(400).json({
      error: "Room ID is required.",
    });
  }

  try {
    const messages = await Message_Bucket.find({ chat: roomId })
      .populate("sender", "full_name email avatar")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to fetch room messages.",
      details: error.message,
    });
  }
};
