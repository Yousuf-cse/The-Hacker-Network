import express from "express";
import { getNotifications } from "../../controllers/notification/notification.controller";

const router = express.Router();

router.get("/:userId", getNotifications);

export default router;
