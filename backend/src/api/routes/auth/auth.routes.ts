import express, { Router } from "express";
import { signupController } from "../../controllers/auth/signup.controller";

const router = express.Router();

router.post("/sign-up", signupController);

export default router;
