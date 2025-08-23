import { Request, Response } from "express";
import ConnectionRequest from "../../../models/connectionRequests/connectionRequest.model";
import HackerHouse from "../../../models/room/room.model";
import { generateUniqueRoomId } from "../../../services/generateUniqueRoomId.service";
import mongoose from "mongoose";
import { io } from "../../../app";

// Get All Request
export const getConnectionRequests = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId as string);
    const requests = await ConnectionRequest.aggregate([
      {
        $match: {
          $or: [
            { from_user_objectId: userObjectId },
            { to_user_objectId: userObjectId },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "from_user_objectId",
          foreignField: "_id",
          as: "fromUser",
        },
      },
      { $unwind: "$fromUser" },
      {
        $lookup: {
          from: "users",
          localField: "to_user_objectId",
          foreignField: "_id",
          as: "toUser",
        },
      },
      { $unwind: "$toUser" },
    ]);
    const formatted = requests.map((reqDoc: any) => {
      const isSender = reqDoc.from_user_objectId.toString() === userId;
      return {
        _id: reqDoc._id,
        status: reqDoc.status,
        role: isSender ? "sender" : "receiver",
        action: isSender
          ? "Request Sent"
          : reqDoc.status === "Pending"
          ? "Confirm / Cancel"
          : reqDoc.status,
        from: {
          id: reqDoc.fromUser._id,
          full_name: reqDoc.fromUser.full_name,
          avatar: reqDoc.fromUser.avatar,
          email: reqDoc.fromUser.email,
          skills: reqDoc.fromUser.skills,
        },
        to: {
          id: reqDoc.toUser._id,
          full_name: reqDoc.toUser.full_name,
          avatar: reqDoc.toUser.avatar,
          email: reqDoc.toUser.email,
          skills: reqDoc.toUser.skills,
        },
      };
    });
    return res.status(200).json({
      success: true,
      message: "Data fetch successfully ...",
      requests: formatted,
    });
  } catch (error) {
    console.error("Error fetching connection requests:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error !..." });
  }
};

// Create new connection request
export const createConnectionRequest = async (req: Request, res: Response) => {
  try {
    const { from_user_objectId, to_user_objectId } = req.body;

    if (!from_user_objectId || !to_user_objectId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Prevent duplicate requests
    const existing = await ConnectionRequest.findOne({
      from_user_objectId,
      to_user_objectId,
      status: "Pending",
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Connection request already sent",
      });
    }

    const connectionRequest = await ConnectionRequest.create({
      from_user_objectId,
      to_user_objectId,
      status: "Pending",
    });

    // ✅ Emit real-time notification to receiver
    io.to(to_user_objectId.toString()).emit("receive_request", {
      senderId: from_user_objectId,
      requestId: connectionRequest._id,
    });

    return res.status(201).json({
      success: true,
      message: "Connection request sent successfully",
      data: connectionRequest,
    });
  } catch (error) {
    console.error("Error creating connection request:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

// Accept connection request
export const acceptConnectionRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;

    const request = await ConnectionRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    request.status = "Accepted";
    await request.save();

    const generatedRoomId = generateUniqueRoomId();
    const room = await HackerHouse.create({
      roomId: generatedRoomId,
      banner: "https://img.jpg",
      title: "Private Chat",
      description: `Room for ${request.from_user_objectId} and ${request.to_user_objectId}`,
      createdBy: request.from_user_objectId,
      members: [request.from_user_objectId, request.to_user_objectId],
      max_members: 6,
      location: "kolkata",
      is_active: true,
    });

    // ✅ Emit notification to sender
    io.to(request.from_user_objectId.toString()).emit("request_accepted", {
      receiverId: request.to_user_objectId,
      roomId: room._id,
    });

    res.status(200).json({
      success: true,
      message: "Request accepted and room created",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error accepting connection request",
      error,
    });
  }
};

// Cancel connection request
export const cancelConnectionRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;

    const request = await ConnectionRequest.findByIdAndUpdate(
      requestId,
      { status: "Cancel" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Connection request not found",
      });
    }

    // ✅ Notify sender & receiver
    io.to(request.from_user_objectId.toString()).emit("request_cancelled", {
      by: "receiver",
      requestId,
    });
    io.to(request.to_user_objectId.toString()).emit("request_cancelled", {
      by: "sender",
      requestId,
    });

    res.status(200).json({
      success: true,
      message: "Request cancelled",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling connection request",
      error,
    });
  }
};
