import express from "express";
const router = express.Router();
import { signUp, login, deleteUser } from "../controllers/user.js";
import checkAuth from "../middleware/check-auth.js";

router.post("/signup", signUp);

router.post("/login", login);

router.delete("/:userId", checkAuth, deleteUser);

export default router;
