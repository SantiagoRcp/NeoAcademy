import { prisma } from "../../config/prisma";
import { Course } from "@prisma/client";
import { CreateCourseDto, UpdateCourseDto } from "./course.dto";
import { IGetCourses } from "./course.types";

export class CourseRepository {
  /**
   * Creates a new course.
   * @param course The course data to create.
   * @returns The created course.
   */
  async createCourse(course: CreateCourseDto): Promise<Course> {
    const { title, description, price, teacherId, categoryId } = course;
    return await prisma.course.create({
      data: { title, description, price, teacherId, categoryId, createdAt: new Date() },
    });
  }

  /**
   * Retrieves a course by its Id.
   * @param id the id of the course to retrieve.
   *  @returns the course if found, otherwise null.
   */
  async getCourseById(id: number, includeLessons: boolean): Promise<Course | null> {
    return await prisma.course.findUnique({ where: { id }, include: { lesson: includeLessons } });
  }

  /**
   * Retrieves all courses with pagination.
   * @param page The page number to retrieve.
   * @param pageSize The number of courses per page.
   * @returns An object containing the courses and pagination information.
   */
  async getAllCourses(page: number, pageSize: number): Promise<IGetCourses> {
    const skip = (page - 1) * pageSize;
    const [courses, totalCourses] = await prisma.$transaction([
      prisma.course.findMany({ skip, take: pageSize, orderBy: { createdAt: "desc" } }),
      prisma.course.count(),
    ]);

    const totalPage = Math.ceil(totalCourses / pageSize);
    return { courses, totalCourses, totalPage, currentPage: page };
  }

  /**
   * Retrieves all courses by category with pagination.
   * @param categoryId The ID of the category to filter courses.
   * @param page The page number to retrieve.
   * @param pageSize The number of courses per page.
   * @returns An object containing the courses and pagination information.
   */
  async getAllCursosByCategory(categoryId: number, page: number, pageSize: number): Promise<IGetCourses> {
    const skip = (page - 1) * pageSize;
    const [courses, totalCourses] = await prisma.$transaction([
      prisma.course.findMany({ where: { categoryId }, skip, take: pageSize, orderBy: { createdAt: "desc" } }),
      prisma.course.count({ where: { categoryId } }),
    ]);

    const totalPage = Math.ceil(totalCourses / pageSize);
    return { courses, totalCourses, totalPage, currentPage: page };
  }

  /**
   * Updates a course by its Id.
   * @param id the id of the course to update.
   * @teacherId the id of teacher.
   * @param course the updated course data.
   * @returns the updated course.
   */
  async updatedCourse(id: number, course: UpdateCourseDto): Promise<Course> {
    return await prisma.course.update({ where: { id }, data: course });
  }
}
