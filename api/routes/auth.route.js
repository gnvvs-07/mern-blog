import express from "express";
import { signup,signin,google } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup); //sign up router
router.post("/signin", signin); //sign up router
router.post("/google",google)
export default router;
