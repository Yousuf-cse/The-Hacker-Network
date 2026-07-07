import { Request, Response } from "express";
import UserModel from "../../../models/user/user.model";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T;
}

const normalizeSkills = (skillsObj: any): string[] => {
  if (!skillsObj) return [];
  const toArray = (val: any) =>
    Array.isArray(val)
      ? val.map((s) => String(s).trim())
      : typeof val === "string"
      ? val.split(",").map((s) => s.trim())
      : [];
  return [...toArray(skillsObj.technical), ...toArray(skillsObj.non_technical)];
};

export const userDetails = async (
  req: Request,
  res: Response<ApiResponse<any>>
) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
        result: null,
      });
    }

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        result: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      result: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      result: null,
    });
  }
};

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
};

export const findSimilarProfile = async (
  req: Request,
  res: Response<ApiResponse<any[]>>
) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
        result: [],
      });
    }

    const mainUser = await UserModel.findById(_id).select("-password").lean();
    if (!mainUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        result: [],
      });
    }

    const mainSkills = normalizeSkills(mainUser.skills);
    const mainLat = mainUser.location?.lat;
    const mainLng = mainUser.location?.lng;

    const otherUsers = await UserModel.find({ _id: { $ne: _id } })
      .select("-password")
      .lean();

    const matches = otherUsers
      .map((user: any) => {
        const userSkills = normalizeSkills(user.skills);
        const commonSkills = userSkills.filter((s: string) =>
          mainSkills.includes(s)
        );

        let distance = Infinity;
        if (
          mainLat != null &&
          mainLng != null &&
          user.location?.lat != null &&
          user.location?.lng != null
        ) {
          distance = getDistance(
            mainLat,
            mainLng,
            user.location.lat,
            user.location.lng
          );
        }

        return {
          ...user,
          similarityScore: commonSkills.length,
          commonSkills,
          near: distance,
        };
      });

    // Try to filter by similarityScore > 0 first
    let result = matches
      .filter((u: any) => u.similarityScore > 0)
      .sort((a: any, b: any) => b.similarityScore - a.similarityScore);

    // Fallback: if no users have overlapping skills, show all other users sorted by distance
    if (result.length === 0) {
      result = matches.sort((a: any, b: any) => a.near - b.near);
    }

    const finalResult = result.slice(0, 10);

    res.status(200).json({
      success: true,
      message: finalResult.length
        ? "Similar profiles found."
        : "No profiles found.",
      result: finalResult,
    });
  } catch (error) {
    console.error("Error finding similar profiles:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
      result: [],
    });
  }
};
