import { Router } from "express";
import { CourseController } from "./course.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { createCourseDto, updateCourseDto } from "./course.dto";

const route = Router();
const course = new CourseController();

route.use(authMiddleware);

route.post("/course", checkRole([3]), zoodMiddleware(createCourseDto), course.createCourse.bind(course));
route.put("/course/:id", checkRole([3]), zoodMiddleware(updateCourseDto), course.updatedCourse.bind(course));

route.get("/course/:id", course.getCourseById.bind(course));
route.get("/courses", course.getAllCurses.bind(course));
route.get("/courses/category/:id", course.getAllCourseByCategory.bind(course));

export default route;
