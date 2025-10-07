import { Router } from "express";
import { AdminController } from "./admin.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";

const router = Router();
const admin = new AdminController();

router.use(authMiddleware);
router.use(checkRole([1]));

router.get("/admin/getStudents", admin.getAllstudents.bind(admin));
router.get("/admin/getTeachers", admin.getAllTecher.bind(admin));
router.get("/admin/teacher-pending", admin.getTeacherPending.bind(admin));
router.post("/admin/accept-teacher/:id", admin.acceptTeacher.bind(admin));

export default router;
