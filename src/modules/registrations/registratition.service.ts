import { Registration } from "@prisma/client";
import { AppError } from "../../utils/AppErrro";
import { CourseRepository } from "../courses/course.reposytory";
import { StudentRepository } from "../student/student.repository";
import { RegistrationRepository } from "./registration.repository";

export class RegistrationService {
  private registrationRepo: RegistrationRepository;
  private courseRepo: CourseRepository;
  private studentRepo: StudentRepository;

  constructor() {
    this.registrationRepo = new RegistrationRepository();
    this.courseRepo = new CourseRepository();
    this.studentRepo = new StudentRepository();
  }

  async registerForCourse(studentId: number, courseId: number): Promise<Registration> {
    const course = await this.courseRepo.getCourseById(courseId, false);
    if (!course) {
      throw new AppError(404, "Course no found.");
    }

    const student = await this.studentRepo.getStudenById(studentId);
    if (!student) {
      throw new AppError(404, "Studet no found.");
    }

    return await this.registrationRepo.registerForCourse(studentId, courseId);
  }

  async getRegistrationById(id: number) {
    const registration = await this.registrationRepo.getRegistrationById(id);
    if (!registration) {
      throw new AppError(404, "The course registration information does not exist.");
    }

    return registration;
  }

  async getStudentCourses(studentId: number) {
    const student = await this.studentRepo.getStudenById(studentId);

    if (!student) {
      throw new AppError(404, "Student no found.");
    }

    const info = await this.registrationRepo.getStudentCourses(studentId);
    return info;
  }

  async getCourseRecords(courseId: number) {
    const course = await this.courseRepo.getCourseById(courseId, false);
    if (!course) {
      throw new AppError(404, "Course no found");
    }

    const info = await this.registrationRepo.getCourseRecords(courseId);
    if (!info || info.length === 0) {
      throw new AppError(400, "There are no students registered");
    }

    return info;
  }
}
