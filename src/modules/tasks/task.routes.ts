import { Router } from "express";
import { TaskController } from "./task.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { createTasktDto } from "./task.dto";
import { updateCourseDto } from "../courses/course.dto";

const taskRouter = Router();
const task = new TaskController();

taskRouter.get("/task/:id", authMiddleware, task.getTask.bind(task));
taskRouter.get("/task/course/:courseId", authMiddleware, task.getAllTasgByCouseId.bind(task));
taskRouter.get("/task/lesson/:lessonId", authMiddleware, task.getAllTaskByLesson.bind(task));

// Routes for teacher
taskRouter.post("/task/create", authMiddleware, checkRole([3]), zoodMiddleware(createTasktDto), task.createTask.bind(task));
taskRouter.put("/task/updated/:id", authMiddleware, checkRole([3]), zoodMiddleware(updateCourseDto), task.updatedTask.bind(task));
taskRouter.delete("/task/deleted/:id", authMiddleware, checkRole([3]), task.deletedTask.bind(task));
export default taskRouter;
