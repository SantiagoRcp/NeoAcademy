import { Router } from "express";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
const user = new UserController();

router.get("/getUser", user.findUserByEmail.bind(user));
router.get("/user/me", authMiddleware, user.getProfile.bind(user));

export default router;
