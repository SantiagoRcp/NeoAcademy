import { Router } from "express";
// import multer from "multer";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { ReactivateAccount, UpadateUserDto } from "./user.dto";
import { upload } from "../../middlewares/multerMiddleware";

const router = Router();
const user = new UserController();

// crear middleware para multer
// const upload = multer({ dest: "uploads/" });

router.get("/user/me", authMiddleware, user.getProfile.bind(user));
router.put(
  "/user/update/:id",
  authMiddleware,
  upload.single("avatarUrl"),
  zoodMiddleware(UpadateUserDto),
  user.updateUser.bind(user)
);
router.put("/user/reactivate-account/", zoodMiddleware(ReactivateAccount), user.reactivateAccount.bind(user));
router.put("/user/suspend-account/:id", authMiddleware, user.suspendAccount.bind(user));

export default router;
