import { Router } from "express";
import { AuthController } from "./auth.controller";
import { RegisterUserDto, LoginUserDto } from "./auth.dto";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { statusUser } from "../../middlewares/statusMiddleware";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
const auth = new AuthController();

router.post("/auth/register", zoodMiddleware(RegisterUserDto), auth.register.bind(auth));
router.post("/auth/login", zoodMiddleware(LoginUserDto), statusUser, auth.login.bind(auth));
router.post("/auth/logout", authMiddleware, auth.logout.bind(auth));

export default router;
