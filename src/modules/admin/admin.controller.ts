import { Request, Response, NextFunction } from "express";
import { AdminService } from "./admin.service";
import logger from "../../config/logger.config";

export class AdminController {
  private adminServ: AdminService;

  constructor() {
    this.adminServ = new AdminService();
  }

  async getAllstudents(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      if (isNaN(page) || isNaN(pageSize) || page <= 0 || pageSize <= 0) {
        return res.status(400).json({ message: "Invalid page or pageSize" });
      }

      const { students, totalStudents, totalPage, currentpage } = await this.adminServ.getAllStudent(page, pageSize);
      return res.status(200).json({ students, totalStudents, totalPage, currentpage });
    } catch (error) {
      logger.error(`Error getting Students. Error: ${error}`);
      next(error);
    }
  }

  async getAllTecher(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      if (isNaN(page) || isNaN(pageSize) || page <= 0 || pageSize <= 0) {
        return res.status(400).json({ message: "Invalid page or pageSize" });
      }

      const { teachers, totalTeachers, totalPage, currentPage } = await this.adminServ.getAllTeacher(page, pageSize);
      return res.status(200).json({ teachers, totalTeachers, totalPage, currentPage });
    } catch (error) {
      logger.error(`Error getting Teacher. Error: ${error}`);
      next(error);
    }
  }

  async getTeacherPending(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      if (isNaN(page) || isNaN(pageSize) || page <= 0 || pageSize <= 0) {
        return res.status(400).json({ message: "Invalid page or pageSize" });
      }

      const teacherPending = await this.adminServ.getTeacherPending(page, pageSize);
      return res.status(200).json({ teacherPending });
    } catch (error) {
      logger.error(`Error getting Teacher pending. ${error}`);
      next(error);
    }
  }

  async acceptTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const acceptTeacher = await this.adminServ.acceptTeacher(id);
      return res.status(200).json({ message: "Teacher accepted", acceptTeacher });
    } catch (error) {
      logger.error(`Error accept teacher. Error: ${error}`);
      next(error);
    }
  }
}
