import { Lesson } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { LessonInput, UpdatedLesson } from "./lesson.dto";

export class LessonRepository {
  async createLesson(data: LessonInput): Promise<Lesson> {
    return await prisma.lesson.create({ data });
  }

  async getAllLessonsByCourseId(courseId: number): Promise<Lesson[]> {
    return await prisma.lesson.findMany({ where: { courseId } });
  }

  async getLessonById(id: number): Promise<Lesson | null> {
    return await prisma.lesson.findUnique({ where: { id } });
  }

  async updatedLesson(id: number, data: UpdatedLesson) {
    return await prisma.lesson.update({ where: { id }, data });
  }
}
