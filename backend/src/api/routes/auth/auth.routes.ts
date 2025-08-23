import express from "express";
import {
  login,
  signupController,
} from "../../controllers/auth/auth.controller";

const router = express.Router();

router.post("/sign-up", signupController);
router.post("/login", login);
// router.post("/change-password", changePasswordController)

export default router;
