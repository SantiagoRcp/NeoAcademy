import { Router } from "express";
import { CourseController } from "./course.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";

const route = Router();
const course = new CourseController();

route.get("/course/:id", authMiddleware, course.getCourseById.bind(course));
route.get("/courses", authMiddleware, course.getAllCurses.bind(course));
route.get("/courses/teacher", authMiddleware, checkRole([3]), course.getCoursesByTeacherId.bind(course));
route.get("/courses/category/:id", authMiddleware, course.getAllCourseByCategory.bind(course));

export default route;
