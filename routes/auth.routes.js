import { Router } from "express";
import {
  getLoginPage,
  getRegisterPage,
} from "../controllers/auth.controller.js";
const router = Router();

router.get("/login", getLoginPage);
router.get("/register", getRegisterPage);

export const authRouter = router;