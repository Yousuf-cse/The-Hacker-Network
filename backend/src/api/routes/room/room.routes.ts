import express from "express";
import { getUserAllRooms } from "../../controllers/room/room.controller";

const router = express.Router();

router.get("/", getUserAllRooms);

export default router;
