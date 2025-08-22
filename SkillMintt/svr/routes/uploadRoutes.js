import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";
import { Profileu , Profilech , Skillset , Update , Updatepwd ,Thmb , Mda , Updsk , dsk , Rt} from "../controllers/uploadController.js";
//import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/profile", upload.single("profile"), Profileu);
router.post("/chprofile", Profilech);
router.post("/skill", upload.single("file"), Skillset);
router.post("/update", Update);
router.post("/chpwd", Updatepwd);
router.post("/thbn",upload.single("thumbnail"), Thmb);
router.post("/skf",upload.single("skillFile"), Mda);
router.post("/dlt", dsk);
router.post("/upsk", Updsk);
router.post("/rt", protect , Rt);






export default router;
