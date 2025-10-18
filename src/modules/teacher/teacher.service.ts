import { Course, Lesson } from "@prisma/client";
import { AppError } from "../../utils/AppErrro";
import { CreateCourseDto, UpdateCourseDto } from "../courses/course.dto";
import { CourseRepository } from "../courses/course.reposytory";
import { TeacherRepository } from "./teacher.repository";
import { ITeacherUpdate } from "./teacher.types";
import { IUpdateTeacher } from "./teacher.dto";
import { LessonInput, UpdatedLesson } from "../lesson/lesson.dto";
import { LessonRepository } from "../lesson/lesson.repository";

export class TeacherService {
  private teacherRepo: TeacherRepository;
  private courseRepo: CourseRepository;
  private lessonRepo: LessonRepository;

  constructor() {
    this.teacherRepo = new TeacherRepository();
    this.courseRepo = new CourseRepository();
    this.lessonRepo = new LessonRepository();
  }

  async updateTeacher(teacherId: number, data: IUpdateTeacher): Promise<ITeacherUpdate> {
    const updatedTeacher = await this.teacherRepo.updatedTeacherById(teacherId, data);

    return updatedTeacher;
  }

  // Create Course
  async createCourse(teacherId: number, data: CreateCourseDto): Promise<Course> {
    return await this.courseRepo.createCourse(teacherId, data);
  }

  // Update Course
  async updatedCourse(teacherId: number, courseId: number, data: UpdateCourseDto): Promise<Course> {
    const course = await this.courseRepo.getCourseById(courseId, false);

    if (!course) {
      throw new AppError(404, "Course no found.");
    }

    if (course.teacherId !== teacherId) {
      throw new AppError(403, "You cannot edit this course");
    }

    return this.courseRepo.updatedCourse(courseId, data);
  }

  // Create Lesson
  async createdLesson(teacherId: number, data: LessonInput): Promise<Lesson> {
    const course = await this.courseRepo.getCourseById(data.courseId, false);

    if (course?.teacherId !== teacherId) {
      throw new AppError(403, "You cannot add lesson to this course");
    }

    const createLesson = await this.lessonRepo.createLesson(data);

    return createLesson;
  }

  // Update Lesson
  async updatedLesson(id: number, teacherId: number, data: UpdatedLesson): Promise<Lesson> {
    const lesson = await this.lessonRepo.getLessonById(id);

    if (!lesson) {
      throw new AppError(404, "Lesson not found.");
    }

    return await this.lessonRepo.updatedLesson(id, data);
  }
}
