import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token is missing or invalid",
    });
  }

  try {
    const jwtKey = process.env.JWT_KEY;
    if (!jwtKey) {
      throw new Error("JWT_KEY is not defined in backend env");
    }

    const decoded = jwt.verify(token, jwtKey as Secret) as {
      id: string;
      email: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
