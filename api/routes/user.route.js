// user routing
import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router(); // user router

router.get("/test", test);

// export
export default router;
