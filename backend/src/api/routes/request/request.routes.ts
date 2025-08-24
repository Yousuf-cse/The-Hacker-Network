import express from "express";
import {
  acceptConnectionRequest,
  cancelConnectionRequest,
  createConnectionRequest,
  getConnectionRequestById,
  getConnectionRequests,
} from "../../controllers/request/request.controller";

const router = express.Router();

router.get("/", getConnectionRequests);
router.get("/:requestId", getConnectionRequestById);
router.post("/", createConnectionRequest);
router.put("/accept/:requestId", acceptConnectionRequest);
router.put("/cancel/:requestId", cancelConnectionRequest);

export default router;
