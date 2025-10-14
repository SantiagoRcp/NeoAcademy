import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = Router();
const user = new UserController();

router.use(authMiddleware);

router.get("/user/me", user.getProfile.bind(user));
router.post("/user/update/:id", user.updateUser.bind(user));
router.put("/user/suspend-account/:id", user.suspendAccount.bind(user));

export default router;
