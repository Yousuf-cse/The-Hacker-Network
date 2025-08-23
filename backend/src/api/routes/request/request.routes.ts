import express from "express";
import {
  acceptConnectionRequest,
  cancelConnectionRequest,
  createConnectionRequest,
} from "../../controllers/request/request.controller";

const router = express.Router();

router.post("/", createConnectionRequest);
router.put("/accept/:requestId", acceptConnectionRequest);
router.put("/cancel/:requestId", cancelConnectionRequest);

export default router;
