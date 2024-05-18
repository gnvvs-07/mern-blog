import express from "express";
import {verifyToken} from "../utils/verifyUser.js";
import { create } from "../controllers/post.controller.js";

const router = express.Router();        //router for posts
router.post("/create",verifyToken,create);      //create is the controller

export default router;