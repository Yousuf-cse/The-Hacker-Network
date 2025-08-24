import express from "express";
import {
  userDetails,
  findSimilarProfile,
} from "../../controllers/user/user.controller";

const router = express.Router();

router.get("/profile/:id", userDetails);

router.post("/find-similar", findSimilarProfile);

export default router;
