import { Router } from "express";
import { AdminController } from "./admin.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";

const AdminRouter = Router();
const admin = new AdminController();

AdminRouter.get("/admin/getStudents", authMiddleware, checkRole([1]), admin.getAllstudents.bind(admin));
AdminRouter.get("/admin/get-teachers", authMiddleware, checkRole([1]), admin.getAllTecher.bind(admin));
AdminRouter.get("/admin/teacher-pending", authMiddleware, checkRole([1]), admin.getTeacherPending.bind(admin));
AdminRouter.put("/admin/accept-teacher/:id", authMiddleware, checkRole([1]), admin.acceptTeacher.bind(admin));

export default AdminRouter;
