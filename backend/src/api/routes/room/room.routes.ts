import express from "express";
import {
  getAllRooms,
  getUserAllRooms,
  createRoom,
} from "../../controllers/room/room.controller";

const router = express.Router();

router.get("/", getUserAllRooms);
router.get("/all-rooms", getAllRooms);
router.post("/", createRoom);

export default router;
