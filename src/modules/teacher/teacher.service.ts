import { TeacherRepository } from "./teacher.repository";
import { ITeacherUpdate } from "./teacher.types";

export class TeacherService {
  private teacherRepo: TeacherRepository;

  constructor() {
    this.teacherRepo = new TeacherRepository();
  }

  async updateTeacher(teacherId: number, data: any): Promise<ITeacherUpdate> {
    const updatedTeacher = await this.teacherRepo.updatedTeacherById(teacherId, data);

    return updatedTeacher;
  }
}
