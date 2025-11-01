import { Task, TaskSubmission } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { CreateTask, UpdatedTask } from "./task.dto";
import { gradeTask, SubmitTask } from "./task.types";

export class TaskRepository {
  async createTask(data: CreateTask): Promise<Task> {
    return await prisma.task.create({ data });
  }

  async getTaskById(taskId: number): Promise<Task | null> {
    return await prisma.task.findUnique({ where: { id: taskId } });
  }

  async getAllTaskByCourse(courseId: number): Promise<Task[] | null> {
    return await prisma.task.findMany({ where: { courseId } });
  }

  async getAllTaskByLesson(lessonId: number): Promise<Task[] | null> {
    return await prisma.task.findMany({ where: { lessonId } });
  }

  async updatedTask(id: number, data: UpdatedTask): Promise<Task> {
    return await prisma.task.update({ where: { id }, data });
  }

  async deletedTask(id: number): Promise<Task> {
    return prisma.task.delete({ where: { id } });
  }

  // Subir tareas
  async taskSubmission(task: SubmitTask): Promise<TaskSubmission> {
    return await prisma.taskSubmission.create({ data: task });
  }

  // Calificar Tarea
  async gradeTask(gradeTask: gradeTask, taskId: number) {
    return await prisma.taskSubmission.update({
      where: { id: taskId },
      data: { grade: gradeTask.grade, feedback: gradeTask.feedback },
    });
  }
}
