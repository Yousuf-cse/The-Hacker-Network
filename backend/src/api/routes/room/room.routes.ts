import express from "express";
import {
  getAllRooms,
  getUserAllRooms,
} from "../../controllers/room/room.controller";

const router = express.Router();

router.get("/", getUserAllRooms);
router.get("/all-rooms", getAllRooms);

export default router;
