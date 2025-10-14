import { Router } from "express";
import { TeacherController } from "./teacher.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { UpdateTeacherDto } from "./teacher.dto";

const router = Router();
const teacher = new TeacherController();

router.use(authMiddleware);

router.put("/teachers/:id", checkRole([3]), zoodMiddleware(UpdateTeacherDto), teacher.updatedTeacher.bind(teacher));

export default router;
