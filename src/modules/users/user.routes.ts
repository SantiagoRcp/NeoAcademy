import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { ReactivateAccount, UpadateUserDto } from "./user.dto";

const router = Router();
const user = new UserController();

router.get("/user/me", authMiddleware, user.getProfile.bind(user));
router.post("/user/update/:id", authMiddleware, zoodMiddleware(UpadateUserDto), user.updateUser.bind(user));
router.put("/user/reactivate-account/", zoodMiddleware(ReactivateAccount), user.reactivateAccount.bind(user));
router.put("/user/suspend-account/:id", authMiddleware, user.suspendAccount.bind(user));

export default router;
