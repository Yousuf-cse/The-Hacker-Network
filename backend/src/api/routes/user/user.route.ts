import express from "express";
import { userDetails } from "../../controllers/user/user.controller";

const router = express.Router();

router.get("/profile", userDetails);

export default router;
