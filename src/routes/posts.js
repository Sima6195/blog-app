import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} from "../controllers/postController.js";

const router = Router();

router.get("/", getAllPosts);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
