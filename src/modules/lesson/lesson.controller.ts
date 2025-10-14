import { Request, Response, NextFunction } from "express";
import { LessonService } from "./lesson.service";
import logger from "../../config/logger.config";

export class LessonController {
  private lessonServ: LessonService;

  constructor() {
    this.lessonServ = new LessonService();
  }

  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const lesson = await this.lessonServ.created(data);
      return res.status(200).json({ message: "Lesson created successfully", lesson });
    } catch (error) {
      logger.error("Error in create lesson.", error);
      next(error);
    }
  }

  async getLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const lesson = await this.lessonServ.getLessonById(id);
      return res.status(200).json({ message: "Lesson found", lesson });
    } catch (error) {
      logger.error("Error: Getting lesson.", error);
      next(error);
    }
  }

  async updatedLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const id = Number(req.params.id);

      const lesson = await this.lessonServ.updatedLesson(id, data);
      return res.status(200).json({ message: "lesson updated correctly ", lesson });
    } catch (error) {
      logger.error("Error: Getting lesson.", error);
      next(error);
    }
  }
}
