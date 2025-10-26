import { Router } from "express";
import { Registrationcontroller } from "./registration.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";

const registrationRoutes = Router();
const regis = new Registrationcontroller();

registrationRoutes.get("/registration/:id", authMiddleware, regis.getRegistrarionById.bind(regis));

// Only student
registrationRoutes.post("/registration-course/:id", authMiddleware, checkRole([2]), regis.registerForCourse.bind(regis));
registrationRoutes.get("/get-student-courses/", authMiddleware, checkRole([2]), regis.getStudentCourses.bind(regis)); 

// Only admin
registrationRoutes.get(
  "/get-information-course-registration/:id",
  authMiddleware,
  checkRole([1]),
  regis.getCourseRecords.bind(regis)
); 

export default registrationRoutes;
