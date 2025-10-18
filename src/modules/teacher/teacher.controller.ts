import { Request, Response, NextFunction } from "express";
import { TeacherService } from "./teacher.service";
import logger from "../../config/logger.config";
import { IUpdateTeacher } from "./teacher.dto";
import { CreateCourseDto, UpdateCourseDto } from "../courses/course.dto";
import { AppError } from "../../utils/AppErrro";

export class TeacherController {
  private teacherServ: TeacherService;

  constructor() {
    this.teacherServ = new TeacherService();
  }

  async updatedTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherId = Number(req.user?.teacherId);
      const data = req.body as IUpdateTeacher;

      const updatedTeacher = await this.teacherServ.updateTeacher(teacherId, data);
      return res.status(200).json({ message: "Teacher updated successfully", data: updatedTeacher });
    } catch (error) {
      logger.error("Error updating teacher", { error });
      next(error);
    }
  }

  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherId = Number(req.user?.teacherId);
      const data = req.body as CreateCourseDto;

      const course = await this.teacherServ.createCourse(teacherId, data);

      return res.status(200).json({ message: "Course Created successfully.", course });
    } catch (error) {
      logger.error("Error in created course", error);
      next(error);
    }
  }

  async updatedCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = Number(req.params.id);
      const teacherId = Number(req.user?.teacherId);
      const data = req.body as UpdateCourseDto;

      if (!courseId) {
        throw new AppError(400, "The id course is required as param");
      }

      const course = await this.teacherServ.updatedCourse(teacherId, courseId, data);
      return res.status(200).json({ message: "Course updated successfully.", course });
    } catch (error) {
      logger.error("Error in updated course", error);
      next(error);
    }
  }



  async createLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const teacherId = Number(req.user?.teacherId);
      const lesson = await this.teacherServ.createdLesson(teacherId, data);
      return res.status(200).json({ message: "Lesson created successfully", lesson });
    } catch (error) {
      logger.error("Error in create lesson.", error);
      next(error);
    }
  }

  async updatedLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const teacherId = Number(req.user?.teacherId);
      const id = Number(req.params.id);

      const lesson = await this.teacherServ.updatedLesson(id, teacherId, data);
      return res.status(200).json({ message: "lesson updated correctly ", lesson });
    } catch (error) {
      logger.error("Error: Getting lesson.", error);
      next(error);
    }
  }
}
