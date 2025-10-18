import { z } from "zod";

export const createCourseDto = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  price: z.number().min(0),
  categoryId: z.number().min(1),
});

export const updateCourseDto = createCourseDto.partial();

export type CreateCourseDto = z.infer<typeof createCourseDto>;
export type UpdateCourseDto = z.infer<typeof updateCourseDto>;
