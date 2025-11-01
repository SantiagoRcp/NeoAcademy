import { z } from "zod";

export const createTasktDto = z.object({
  courseId: z.number().int().positive().min(1, "CourseId is required."),
  lessonId: z.number().int().positive().min(1, "LessonId is required."),
  title: z.string().min(3, "Title is required.").trim(),
  description: z.string().min(1, "Description is required."),
  dueDate: z.coerce.date(),
});

export const gradeTaskDto = z.object({
  grade: z.number().int().positive().min(1, "Grade is required."),
  feedback: z.string().min(3, "feedback is required.").trim(),
});

export const updatedTaskDto = createTasktDto.partial();

export type CreateTask = z.infer<typeof createTasktDto>;
export type UpdatedTask = z.infer<typeof updatedTaskDto>;
export type GradeTask = z.infer<typeof gradeTaskDto>;
