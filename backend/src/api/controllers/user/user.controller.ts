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
    if (mainSkills.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No skills found for the main user.",
        result: [],
      });
    }

    const otherUsers = await UserModel.find({ _id: { $ne: _id } })
      .select("-password")
      .lean();

    const matches = otherUsers
      .map((user: any) => {
        const userSkills = normalizeSkills(user.skills);
        const commonSkills = userSkills.filter((s: string) =>
          mainSkills.includes(s)
        );

        return {
          ...user,
          similarityScore: commonSkills.length,
          commonSkills,
        };
      })
      .filter((u: any) => u.similarityScore > 0)
      .sort((a: any, b: any) => b.similarityScore - a.similarityScore)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      message: matches.length
        ? "Similar profiles found."
        : "No similar profiles found.",
      result: matches,
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
