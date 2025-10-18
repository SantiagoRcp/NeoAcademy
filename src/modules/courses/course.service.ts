import { Course } from "@prisma/client";
import { CourseRepository } from "./course.reposytory";
import {  UpdateCourseDto } from "./course.dto";
import { IGetCourses } from "./course.types";
import { AppError } from "../../utils/AppErrro";

export class CourseService {
  private courseRepo: CourseRepository;

  constructor() {
    this.courseRepo = new CourseRepository();
  }

  // async createCourse(course: CreateCourseDto): Promise<Course> {
  //   return await this.courseRepo.createCourse(course);
  // }

  async getCourseById(id: number, includeLessons: boolean = false): Promise<Course> {
    const course = await this.courseRepo.getCourseById(id, includeLessons);

    if (!course) {
      throw new AppError(404, "Course not found");
    }

    return course;
  }

  async getCoursesByTeacherId(teacherId: number, page: number, pageSize: number): Promise<IGetCourses> {
    return await this.courseRepo.getCoursesByTeacherId(teacherId, page, pageSize);
  }

  async getAllCourses(page: number, pageSize: number): Promise<IGetCourses> {
    return await this.courseRepo.getAllCourses(page, pageSize);
  }

  async getAllCursosByCategory(categoryId: number = 1, page: number = 10, pageSize: number): Promise<IGetCourses> {
    return await this.courseRepo.getAllCursosByCategory(categoryId, page, pageSize);
  }

  async updatedCourse(id: number, teacherId: number, data: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepo.getCourseById(id, false);

    if (!course) {
      throw new AppError(404, "Course not found");
    }

    if (teacherId !== course.teacherId) {
      throw new AppError(403, "You do not have permission to modify the resource.");
    }

    return await this.courseRepo.updatedCourse(id, data);
  }
}
