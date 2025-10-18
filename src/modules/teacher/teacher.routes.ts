import { Router } from "express";
import { TeacherController } from "./teacher.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { UpdateTeacherDto } from "./teacher.dto";
import { createCourseDto, updateCourseDto } from "../courses/course.dto";
import { statusTeacher } from "../../middlewares/statusMiddleware";
import { lessonSchemaDto, updatedLesson } from "../lesson/lesson.dto";

const router = Router();
const teacher = new TeacherController();

// Actualizar Teacher
router.put(
  "/teacher/:id",
  authMiddleware,
  checkRole([3]),
  zoodMiddleware(UpdateTeacherDto),
  teacher.updatedTeacher.bind(teacher)
);

// Crear Curso
router.post(
  "/teacher/course",
  authMiddleware,
  checkRole([3]),
  statusTeacher,
  zoodMiddleware(createCourseDto),
  teacher.createCourse.bind(teacher)
);

// Update Curso
router.put(
  "/teacher/course/:id",
  authMiddleware,
  checkRole([3]),
  statusTeacher,
  zoodMiddleware(updateCourseDto),
  teacher.updatedCourse.bind(teacher)
);

// Create Lesson
router.post(
  "/teacher/lesson",
  authMiddleware,
  checkRole([3]),
  zoodMiddleware(lessonSchemaDto),
  teacher.createLesson.bind(teacher)
);

// Update Lesson
router.put(
  "/teacher/lesson/:id",
  authMiddleware,
  checkRole([3]),
  zoodMiddleware(updatedLesson),
  teacher.updatedLesson.bind(teacher)
);
export default router;
