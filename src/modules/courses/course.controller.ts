import { Request, Response, NextFunction } from "express";
import { CourseService } from "./course.service";
import logger from "../../config/logger.config";

export class CourseController {
  private courseServ: CourseService;

  constructor() {
    this.courseServ = new CourseService();
  }

  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const dataCourse = req.body;
      const course = await this.courseServ.createCourse(dataCourse);
      return res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
      logger.error("Error creating course:", error);
      next(error);
    }
  }

  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const course = await this.courseServ.getCourseById(id, true);
      return res.status(200).json({ message: "Course found", course });
    } catch (error) {
      logger.error("Error gtting course", error);
      next(error);
    }
  }

  async getAllCurses(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      const courses = await this.courseServ.getAllCourses(page, pageSize);
      return res.status(200).json({ message: "Courses", courses });
    } catch (error) {
      logger.error("Error getting courses", error);
      next(error);
    }
  }

  async getAllCourseByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
      const categoryId = parseInt(req.params.id);
      const courses = await this.courseServ.getAllCursosByCategory(categoryId, page, pageSize);
      return res.status(200).json({ message: "Courses", courses });
    } catch (error) {
      logger.error("Error gettin courses", error);
      next(error);
    }
  }

  async updatedCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const courseId = parseInt(req.params.id);
      const teacherId = Number(req.user?.id);

      const upatedCourse = await this.courseServ.updatedCourse(courseId, teacherId, data);
      return res.status(200).json({ message: "Course Correctly Updated", upatedCourse });
    } catch (error) {
      logger.error("Error updating course:", error);
      next(error);
    }
  }
}
