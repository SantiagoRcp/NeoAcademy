import { Request, Response, NextFunction } from "express";
import { TeacherService } from "./teacher.service";
import logger from "../../config/logger.config";
import { IUpdateTeacher } from "./teacher.dto";

export class TeacherController {
  private teacherServ: TeacherService;

  constructor() {
    this.teacherServ = new TeacherService();
  }

  async updatedTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherId = parseInt(req.params.id);
      const data = req.body as IUpdateTeacher;

      const updatedTeacher = await this.teacherServ.updateTeacher(teacherId, data);
      return res.status(200).json({ message: "Teacher updated successfully", data: updatedTeacher });
    } catch (error) {
      logger.error("Error updating teacher", { error });
      next(error);
    }
  }
}
