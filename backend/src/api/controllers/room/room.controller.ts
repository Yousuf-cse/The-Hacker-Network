import { Request, Response } from "express";
import mongoose from "mongoose";
import HackerHouse from "../../../models/room/room.model";
import { generateUniqueRoomId } from "../../../services/generateUniqueRoomId.service";

export const getUserAllRooms = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId as string);

    const rooms = await HackerHouse.aggregate([
      {
        $match: {
          $or: [
            {
              createdBy: userObjectId,
            },
            {
              members: userObjectId,
            },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdByUser",
        },
      },
      {
        $unwind: {
          path: "$createdByUser",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          as: "memberUsers",
        },
      },
      {
        $addFields: {
          isLeader: {
            $eq: [{ $toString: "$createdBy" }, userObjectId.toString()],
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully ...",
      rooms,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server error",
    });
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await HackerHouse.find();

    return res.status(200).json({
      success: true,
      message: "All rooms fetched successfully.",
      rooms,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server error",
    });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { title, description, location, max_members, createdBy, banner } = req.body;

    if (!title || !description || !location || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (title, description, location, createdBy)",
      });
    }

    const roomId = generateUniqueRoomId();
    const newRoom = await HackerHouse.create({
      roomId,
      banner: banner || "https://res.cloudinary.com/dpw89wko7/image/upload/v1755944742/get_2_dlgq17.jpg",
      title,
      description,
      createdBy,
      members: [createdBy],
      max_members: Number(max_members) || 6,
      location,
      is_active: true,
    });

    return res.status(201).json({
      success: true,
      message: "Hacker House created successfully",
      room: newRoom,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server error",
    });
  }
};
