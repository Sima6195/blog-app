import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import { getProfile, updateProfile } from "../controllers/serController.js";

const router = Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

export default router;
