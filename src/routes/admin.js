import { Router } from "express";
import { protect, isAdmin } from "../middlewares/auth.js";
import {
  getAllUsers,
  deleteUser,
  deletePostAdmin
} from "../controllers/adminController.js";

const router = Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/users/:id", protect, isAdmin, deleteUser);
router.delete("/posts/:id", protect, isAdmin, deletePostAdmin);

export default router;
