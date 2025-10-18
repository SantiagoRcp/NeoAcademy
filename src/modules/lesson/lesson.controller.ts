import { Request, Response, NextFunction } from "express";
import { LessonService } from "./lesson.service";
import logger from "../../config/logger.config";

export class LessonController {
  private lessonServ: LessonService;

  constructor() {
    this.lessonServ = new LessonService();
  }

  async getLessonById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const lesson = await this.lessonServ.getLessonById(id);
      return res.status(200).json({ message: "Lesson found", lesson });
    } catch (error) {
      logger.error("Error: Getting lesson.", error);
      next(error);
    }
  }

  async getAllLessonsByCourseId(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = Number(req.params.id);

      const lessons = await this.lessonServ.getAllLessonsByCourseId(courseId);
      return res.status(200).json({ message: "Lessons found", lessons });
    } catch (error) {
      logger.error("Error: Getting lessons.", error);
      next(error);
    }
  }
}
