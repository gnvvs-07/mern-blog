import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletepost,
  getposts,
  updatepost,
} from "../controllers/post.controller.js";

const router = express.Router(); //router for posts
router.post("/create", verifyToken, create); //create is the controller
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId",verifyToken,updatepost);
export default router;
