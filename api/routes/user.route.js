// user routing
import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router(); // user router

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser); //update user route

// export
export default router;
