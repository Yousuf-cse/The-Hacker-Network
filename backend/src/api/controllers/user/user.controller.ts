import { Request, Response } from "express";
import UserModel from "../../../models/user/user.model";

export const userDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const findSimilarProfile = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }

    const mainUser = await UserModel.findOne({ email })
      .select("-password")
      .lean();
    if (!mainUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Normalize skills into arrays
    const normalizeSkills = (skillsObj: any) => {
      if (!skillsObj) return [];
      const technical = skillsObj.technical
        ? skillsObj.technical.split(",").map((s: string) => s.trim())
        : [];
      const nonTechnical = skillsObj.non_technical
        ? skillsObj.non_technical.split(",").map((s: string) => s.trim())
        : [];
      return [...technical, ...nonTechnical];
    };

    const mainSkills = normalizeSkills(mainUser.skills);

    if (mainSkills.length === 0) {
      return res.status(200).json({ success: true, matches: [] });
    }

    const otherUsers = await UserModel.find({ email: { $ne: email } })
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

    res.status(200).json({ success: true, matches });
  } catch (error) {
    console.error("Error finding similar profiles:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
