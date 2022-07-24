import express from "express";
const router = express.Router();

import { register, login, updateUser, getUserInfo } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/me").get(getUserInfo);

export default router;
