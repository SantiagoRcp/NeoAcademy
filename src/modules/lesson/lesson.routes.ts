import { Router } from "express";
import { LessonController } from "./lesson.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const routesLesson = Router();
const lesson = new LessonController();

routesLesson.get("/lesson/:id", authMiddleware, lesson.getLessonById.bind(lesson));
routesLesson.get("/lesson/course/:id", authMiddleware, lesson.getAllLessonsByCourseId.bind(lesson));

export default routesLesson;
