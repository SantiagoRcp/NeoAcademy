import { Task } from "@prisma/client";
import { AppError } from "../../utils/AppErrro";
import { CourseRepository } from "../courses/course.reposytory";
import { LessonRepository } from "../lesson/lesson.repository";
import { CreateTask, UpdatedTask } from "./task.dto";
import { TaskRepository } from "./task.repository";

export class TaskService {
  private taskRepo: TaskRepository;
  private courseRepo: CourseRepository;
  private lessonRepo: LessonRepository;

  constructor() {
    this.taskRepo = new TaskRepository();
    this.courseRepo = new CourseRepository();
    this.lessonRepo = new LessonRepository();
  }

  async createdTask(data: CreateTask): Promise<Task> {
    const course = await this.courseRepo.getCourseById(data.courseId, false);
    if (!course) {
      throw new AppError(404, "Course no found.");
    }

    const lesson = await this.lessonRepo.getLessonById(data.lessonId);
    if (!lesson) {
      throw new AppError(404, "Lesson no found");
    }

    return await this.taskRepo.createTask(data);
  }

  async getTaskbyId(id: number): Promise<Task> {
    const task = await this.taskRepo.getTaskById(id);
    if (!task) {
      throw new AppError(404, "Task no found.");
    }

    return task;
  }

  async getAllTaskByCourse(courseId: number): Promise<Task[]> {
    const course = await this.courseRepo.getCourseById(courseId, false);

    if (!course) {
      throw new AppError(404, "Course no found");
    }

    const tasks = await this.taskRepo.getAllTaskByCourse(courseId);

    if (!tasks || tasks.length === 0) {
      throw new AppError(404, "This course has no assignments.");
    }
    return tasks;
  }

  async getAllTaskByLesson(lessonId: number): Promise<Task[]> {
    const lesson = await this.lessonRepo.getLessonById(lessonId);
    if (!lesson) {
      throw new AppError(404, "Lesson no found.");
    }

    const tasks = await this.taskRepo.getAllTaskByLesson(lessonId);

    if (!tasks || tasks.length === 0) {
      throw new AppError(404, "This lesson has no homework");
    }

    return tasks;
  }

  async updateTask(id: number, data: UpdatedTask): Promise<Task> {
    const task = await this.getTaskbyId(id);

    return await this.taskRepo.updatedTask(task.id, data);
  }

  async deletedTask(id: number): Promise<Task> {
    const task = await this.getTaskbyId(id);
    return await this.taskRepo.deletedTask(task.id);
  }
}
