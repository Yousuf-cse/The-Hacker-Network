import { Request, Response } from "express";
import mongoose from "mongoose";
import HackerHouse from "../../../models/room/room.model";

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
