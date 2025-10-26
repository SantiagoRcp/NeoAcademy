import { Request, Response, NextFunction } from "express";
import { RegistrationService } from "./registratition.service";
import { AppError } from "../../utils/AppErrro";
import logger from "../../config/logger.config";

export class Registrationcontroller {
  private registrationServ: RegistrationService;

  constructor() {
    this.registrationServ = new RegistrationService();
  }

  async registerForCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = Number(req.user?.studentId);
      const courseId = Number(req.params.id);

      console.log(studentId);

      if (!Number.isInteger(courseId) || !courseId) {
        throw new AppError(400, "Course id is required.");
      }

      const registration = await this.registrationServ.registerForCourse(studentId, courseId);
      return res.status(200).json({ message: "Successful registration.", registration });
    } catch (error) {
      next(error);
    }
  }

  async getRegistrarionById(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = Number(req.params.id);
      if (!Number.isInteger(courseId) || !courseId) {
        throw new AppError(400, "The course id is required.");
      }

      const registration = await this.registrationServ.getRegistrationById(courseId);
      return res.status(200).json({ message: "Course registration information.", registration });
    } catch (error) {
      next(error);
    }
  }

  async getStudentCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = Number(req.user?.studentId);
      if (!Number.isInteger(studentId) || !studentId) {
        throw new AppError(400, "Invalid student id.");
      }

      const info = await this.registrationServ.getStudentCourses(studentId);
      return res.status(200).json({ message: "Student Course Information", info });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  async getCourseRecords(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.params.id);
      const courseId = Number(req.params.id);
      if (!Number.isInteger(courseId) || !courseId) {
        throw new AppError(400, "Invalid course id.");
      }
      const data = await this.registrationServ.getCourseRecords(courseId);
      return res.status(200).json({ messge: "Course Information", data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
}
