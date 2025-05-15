import { Router } from "express";
import {
  postURLShortener,
  getShortenerPage,
  redirectToShortLink,
  getEditShortenerPage,
  postEditShortenerPage,
} from "../controllers/postshortener.controller.js";

const router = Router();

router.get("/", getShortenerPage);

router.post("/", postURLShortener);

router.get("/:shortCode", redirectToShortLink);

router.route("/edit/:userId/:id").get(getEditShortenerPage).post(postEditShortenerPage);

// router.post("/delete/:id", deleteShortLink);

//default export
// export default router;

// Named exports
export const shortenerRoutes = router;
