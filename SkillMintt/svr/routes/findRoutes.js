import express from "express";
import { fuser,fskill, getFeed, getExns , getExnsdtl, getCources, getCrsdtl, getSch,fus } from "../controllers/findController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/profile",protect, fuser);
router.post("/skill",protect, fskill);
router.get("/feed", getFeed);
router.get("/exns",protect, getExns);
router.post("/exnsdtl",protect, getExnsdtl);
router.get("/crs",protect, getCources);
router.post("/crsdtl",protect, getCrsdtl);
router.post("/sch", getSch);
router.post("/schpf", fus);


export default router;
