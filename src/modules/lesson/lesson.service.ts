import { Lesson } from "@prisma/client";
import { LessonInput, UpdatedLesson } from "./lesson.dto";
import { LessonRepository } from "./lesson.repository";
import { AppError } from "../../utils/AppErrro";

export class LessonService {
  private lessonRepo: LessonRepository;

  constructor() {
    this.lessonRepo = new LessonRepository();
  }

  async created(data: LessonInput): Promise<Lesson> {
    const createLesson = await this.lessonRepo.creatLesson(data);
    return createLesson;
  }

  async getLessonById(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepo.getLessonById(id);
    if (!lesson) {
      throw new AppError(404, "Lesson not found.");
    }
    return lesson;
  }

  async updatedLesson(id: number, data: UpdatedLesson): Promise<Lesson> {
    const lesson = await this.lessonRepo.getLessonById(id);

    if (!lesson) {
      throw new AppError(404, "Lesson not found.");
    }

    return await this.lessonRepo.updatedLesson(id, data);
  }
}
