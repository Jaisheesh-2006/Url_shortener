import { Router } from "express";
import {
  getLoginPage,
  getRegisterPage,
  getUserInfo,
  logoutUser,
  postLoginPage,
  postRegisterPage,
} from "../controllers/auth.controller.js";
const router = Router();

router.route("/login").get(getLoginPage).post(postLoginPage);
router.route("/register").get(getRegisterPage).post(postRegisterPage);
router.route("/me").get(getUserInfo)
router.route("/logout").get(logoutUser)
export const authRouter = router;