import { Request, Response } from "express";
import Notification_Bucket from "../../../models/notification/notification.model";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const notifications = await Notification_Bucket.find({
      reciever_object_id: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
