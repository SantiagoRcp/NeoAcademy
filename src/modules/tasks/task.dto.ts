import { z } from "zod";

export const createTasktDto = z.object({
  courseId: z.number().int().positive().min(1, "CourseId is required."),
  lessonId: z.number().int().positive().min(1, "LessonId is required."),
  title: z.string().min(3, "Title is required.").trim(),
  description: z.string().min(1, "Description is required."),
  dueDate: z.coerce.date(),
});

export const updatedTaskDto = createTasktDto.partial();

export type CreateTask = z.infer<typeof createTasktDto>;
export type UpdatedTask = z.infer<typeof updatedTaskDto>;
