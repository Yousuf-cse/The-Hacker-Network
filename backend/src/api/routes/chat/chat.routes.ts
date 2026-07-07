import express from "express";
import {
  sendMessage,
  getRoomMessages,
} from "../../controllers/chat/chat.controller";

const router = express.Router();

router.get("/:roomId", getRoomMessages);
router.post("/", sendMessage);

export default router;
