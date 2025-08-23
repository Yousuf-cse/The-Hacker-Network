// export const getSkillBasedUserRecommended = () => {
//     try {

import { Request, Response } from "express";
import ConnectionRequest from "../../../models/connectionRequests/connectionRequest.model";
import HackerHouse from "../../../models/room/room.model";
import { generateUniqueRoomId } from "../../../services/generateUniqueRoomId.service";

//     } catch (error) {

//     }
// }

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

// Get all requests

// export const getConnectionRequests = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.query;
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     const request = await ConnectionRequest.aggregate([
//       {
//         $match: {
//           $or: [{ from_user_objectId: userId }, { to_user_objectId: userId }],
//         },
//       },
//       {
//         $lookup : {

//         }
//       }
//     ]);
//   } catch (error) {
//     console.error("Error fetching connection requests:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server error !...",
//     });
//   }
// };

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
    // Create Room when accepted
    const room = await HackerHouse.create({
      roomId: generatedRoomId,
      banner: "",
      title: "Private Chat",
      description: `Room for ${request.from_user_objectId} and ${request.to_user_objectId}`,
      createdBy: request.from_user_objectId,
      members: [request.from_user_objectId, request.to_user_objectId],
      max_members: 2,
      location: "",
      is_active: true,
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
