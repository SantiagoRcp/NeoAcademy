import { z } from "zod";
import { updateCourseDto } from "../courses/course.dto";

export const createCategoryDto = z.object({
  name: z.string().min(1, "Name is required.").trim(),
  description: z.string().trim().optional(),
});

export const updateCategoryDto = createCategoryDto.partial();

export type CreateCategory = z.infer<typeof createCategoryDto>;
export type UpdateCategory = z.infer<typeof updateCourseDto>;
