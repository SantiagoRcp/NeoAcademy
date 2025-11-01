import { Router } from "express";
import { TaskController } from "./task.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { createTasktDto, gradeTaskDto } from "./task.dto";
import { updateCourseDto } from "../courses/course.dto";
import { upload } from "../../middlewares/multerMiddleware";

const taskRouter = Router();
const task = new TaskController();

// Obtencion de tareas a usuarios
taskRouter.get("/task/:id", authMiddleware, task.getTask.bind(task));
taskRouter.get("/task/course/:courseId", authMiddleware, task.getAllTasgByCouseId.bind(task));
taskRouter.get("/task/lesson/:lessonId", authMiddleware, task.getAllTaskByLesson.bind(task));

// Routes for teachers
taskRouter.post("/task/create", authMiddleware, checkRole([3]), zoodMiddleware(createTasktDto), task.createTask.bind(task));
taskRouter.put("/task/updated/:id", authMiddleware, checkRole([3]), zoodMiddleware(updateCourseDto), task.updatedTask.bind(task));
taskRouter.delete("/task/deleted/:id", authMiddleware, checkRole([3]), task.deletedTask.bind(task));
// Grade task
taskRouter.put("/task/grade/:taskId", authMiddleware, checkRole([3]), zoodMiddleware(gradeTaskDto), task.gradeTask.bind(task));

// Subir tareas Routes for students
taskRouter.post(
  "/task/submission/:taskId",
  authMiddleware,
  checkRole([2]),
  upload.single("file"),
  task.taskSubmission.bind(task)
);

export default taskRouter;
