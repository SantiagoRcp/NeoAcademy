import { Router } from "express";
import { LessonController } from "./lesson.controller";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { lessonSchemaDto, updatedLesson } from "./lesson.dto";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";

const routesLesson = Router();
const lesson = new LessonController();

routesLesson.use(authMiddleware);
routesLesson.post("/lesson", checkRole([3]), zoodMiddleware(lessonSchemaDto), lesson.createCourse.bind(lesson));
routesLesson.put("/lesson/:id", checkRole([3]), zoodMiddleware(updatedLesson), lesson.updatedLesson.bind(lesson));

routesLesson.get("/lesson/:id", lesson.getLesson.bind(lesson));

export default routesLesson;
