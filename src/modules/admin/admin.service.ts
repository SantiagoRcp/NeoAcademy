import { Teacher } from "@prisma/client";
import { AdminRepository } from "./admin.repository";
import { IGetStudents, IGetTeachers } from "./admin.types";
import { TeacherRepository } from "../teacher/teacher.repository";
import { StudentRepository } from "../student/student.repository";
import { AppError } from "../../utils/AppErrro";

export class AdminService {
  private adminRepo: AdminRepository;
  private teacherRepo: TeacherRepository;
  private studenRepo: StudentRepository;

  constructor() {
    this.adminRepo = new AdminRepository();
    this.teacherRepo = new TeacherRepository();
    this.studenRepo = new StudentRepository();
  }

  async getAllStudent(page: number = 1, pageSize: number = 10): Promise<IGetStudents> {
    const { students, totalStudents, totalPage, currentpage } = await this.studenRepo.getAllStudents(page, pageSize);

    if (students.length === 0) {
      throw new AppError(404, "No students found");
    }
    return { students, totalStudents, totalPage, currentpage };
  }

  async getAllTeacher(page: number = 1, pageSize: number = 10): Promise<IGetTeachers> {
    const { teachers, totalTeachers, totalPage, currentPage } = await this.teacherRepo.getAllTeacher(page, pageSize);

    if (teachers.length === 0) {
      throw new AppError(404, "No teachers found");
    }
    return { teachers, totalTeachers, totalPage, currentPage };
  }

  async getTeacherPending(page: number = 1, pageSize: number = 10): Promise<IGetTeachers> {
    const { teachers, totalTeachers, totalPage, currentPage } = await this.teacherRepo.getTeacherPending(
      page,
      pageSize
    );

    if (teachers.length === 0) {
      throw new AppError(404, "No teachers pending");
    }
    return { teachers, totalTeachers, totalPage, currentPage };
  }

  async acceptTeacher(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepo.getTEacherById(id);
    if (!teacher) {
      throw new AppError(404, "Teacher not found.");
    }

    if (teacher.status !== "PENDING") {
      throw new AppError(400, "Teacher is no PENDING");
    }
    const acceptTeacher = await this.teacherRepo.acceptTeacher(id);
    return acceptTeacher;
  }
}
