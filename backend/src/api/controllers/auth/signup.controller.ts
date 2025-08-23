import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { IUser } from "../../../@types/interface/user.interface";
import UserModel from "../../../models/user/user.model";

export const signupController = async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;

    // Validate required fields
    if (
      !userData.full_name ||
      !userData.email ||
      !userData.age ||
      !userData.address ||
      !userData.education ||
      !userData.skills ||
      !userData.password
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPassword = bcrypt.hash(userData.password, 10);

    // Create new user
    const newUser = new UserModel({
      ...userData,
      password: hashPassword,
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in signupController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
