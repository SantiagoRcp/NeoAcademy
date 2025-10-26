import { Request, Response, NextFunction } from "express";
import { TaskService } from "./task.service";
import logger from "../../config/logger.config";
import { CreateTask, UpdatedTask } from "./task.dto";
import { AppError } from "../../utils/AppErrro";

export class TaskController {
  private taskServ: TaskService;

  constructor() {
    this.taskServ = new TaskService();
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as CreateTask;
      const task = await this.taskServ.createdTask(data);
      return res.status(200).json({ message: "Task create successfully", task });
    } catch (error) {
      logger.error("Error in create Task", error);
      next(error);
    }
  }

  async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw new AppError(400, "Invalid id for the task");
      }

      const task = await this.taskServ.getTaskbyId(id);

      return res.status(200).json({ message: "Task Found.", task });
    } catch (error) {
      next(error);
    }
  }

  async getAllTasgByCouseId(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = Number(req.params.courseId);
      console.log(courseId);
      if (!Number.isInteger(courseId)) {
        throw new AppError(400, "Invalid ID for the course.");
      }

      const tasks = await this.taskServ.getAllTaskByCourse(courseId);
      return res.status(200).json({ message: "Tasks Found.", tasks });
    } catch (error) {
      next(error);
    }
  }

  async getAllTaskByLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const lessonId = Number(req.params.lessonId);
      console.log(lessonId);
      console.log(typeof lessonId);

      if (!Number.isInteger(lessonId)) {
        throw new AppError(400, "Invalid lesson Id.");
      }

      const tasks = await this.taskServ.getAllTaskByLesson(lessonId);
      return res.status(200).json({ message: "Task Found.", tasks });
    } catch (error) {
      next(error);
    }
  }

  async updatedTask(req: Request, res: Response, next: NextFunction) {
    try {
      const idTask = Number(req.params.id);
      const data = req.body as UpdatedTask;

      if (!Number.isInteger(idTask)) {
        throw new AppError(400, "Task id Invalid.");
      }

      const task = await this.taskServ.updateTask(idTask, data);
      return res.status(200).json({ message: "Task Updated successfully.", task });
    } catch (error) {
      next(error);
    }
  }

  async deletedTask(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw new AppError(400, "TAsk id invalid.");
      }

      const task = await this.taskServ.deletedTask(id);
      return res.status(200).json({ message: "Task deleted Successfully.", task });
    } catch (error) {
      next(error);
    }
  }
}
