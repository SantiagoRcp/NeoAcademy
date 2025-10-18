import { Request, Response, NextFunction } from "express";
import { StudentService } from "./student.service";
import { AppError } from "../../utils/AppErrro";

export class StudentController {
  private studentServ: StudentService;

  constructor() {
    this.studentServ = new StudentService();
  }

}
