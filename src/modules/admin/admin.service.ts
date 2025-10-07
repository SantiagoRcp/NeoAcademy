import { AdminRepository } from "./admin.repository";

export class AdminService {
  private adminRepo: AdminRepository;

  constructor() {
    this.adminRepo = new AdminRepository();
  }

  async getAllStudent(page: number = 1, pageSize: number = 10) {
    const { students, totalStudents, totalPage, currentpage } = await this.adminRepo.getAllStudents(page, pageSize);

    if (students.length === 0) {
      throw new Error("No students found");
    }
    return { students, totalStudents, totalPage, currentpage };
  }

  async getAllTeacher(page: number = 1, pageSize: number = 10) {
    const { teachers, totalTeachers, totalPage, currentPage } = await this.adminRepo.getAllTeacher(page, pageSize);

    if (teachers.length === 0) {
      throw new Error("No teachers found");
    }
    return { teachers, totalTeachers, totalPage, currentPage };
  }

  async getTeacherPending(page: number = 1, pageSize: number = 10) {
    const { teacherPending, totalTeachersPending, totalPage, currentPage } = await this.adminRepo.getTeacherPending(
      page,
      pageSize
    );

    if (teacherPending.length === 0) {
      throw new Error("No teachers pending");
    }
    return { teacherPending, totalTeachersPending, totalPage, currentPage };
  }

  async acceptTeacher(id: number) {
    const acceptTeacher = await this.adminRepo.acceptTeacher(id);
    return acceptTeacher;
  }
}
