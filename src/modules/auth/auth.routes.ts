import { Router } from "express";
import { AuthController } from "./auth.controller";
import { RegisterUserDto, LoginUserDto } from "./auth.dto";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";

const router = Router();
const auth = new AuthController();

router.post("/auth/register", zoodMiddleware(RegisterUserDto), auth.register.bind(auth));
router.post("/auth/login", zoodMiddleware(LoginUserDto), auth.login.bind(auth));

export default router;
