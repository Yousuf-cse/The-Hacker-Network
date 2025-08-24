import { Request, Response } from "express";
import Message_Bucket from "../../../models/messages/messages.model";

export const sendMessage = async (req: Request, res: Response) => {
  const { sender, message } = req.body;

  if (!sender || !message) {
    return res.status(400).json({
      error: "Sender and message are required.",
    });
  }

  try {
    const newMessage = await Message_Bucket.create({
      sender,
      message,
    });

    return res.status(201).json(newMessage);
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to send message.",
      details: error.message,
    });
  }
};

// Controller to get all messages
export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await Message_Bucket.find({});
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch messages.",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
