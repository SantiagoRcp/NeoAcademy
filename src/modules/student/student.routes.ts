import { Router } from "express";
import { StudentController } from "./student.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";

const router = Router();
const student = new StudentController();

export default router;
