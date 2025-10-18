import { Lesson } from "@prisma/client";
import { LessonRepository } from "./lesson.repository";
import { AppError } from "../../utils/AppErrro";

export class LessonService {
  private lessonRepo: LessonRepository;

  constructor() {
    this.lessonRepo = new LessonRepository();
  }

  async getLessonById(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.getLessonById(id);
    if (!lesson) {
      throw new AppError(404, "Lesson not found.");
    }
    return lesson;
  }

  async getAllLessonsByCourseId(courseId: number): Promise<Lesson[]> {
    return await this.lessonRepo.getAllLessonsByCourseId(courseId);
  }
  
}
