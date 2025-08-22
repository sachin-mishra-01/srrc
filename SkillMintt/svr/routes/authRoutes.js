import express from "express";
import { signup, login,logout,rOtp,vOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/rotp", rOtp);
router.post("/votp", vOtp);


export default router;
