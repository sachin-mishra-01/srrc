import express from "express";

import { exchangeSkill , acceptRequest , rejectRequest } from "../controllers/exchangeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();



// Exchange
router.post("/exchange",protect, exchangeSkill);
router.post("/ac",protect, acceptRequest);
router.post("/rj",protect, rejectRequest);

export default router;
