import { Router } from "express";
import {
  getLoginPage,
  getRegisterPage,
  postLoginPage,
  postRegisterPage,
} from "../controllers/auth.controller.js";
const router = Router();

router.route("/login").get(getLoginPage).post(postLoginPage);
router.route("/register").get(getRegisterPage).post(postRegisterPage);

export const authRouter = router;