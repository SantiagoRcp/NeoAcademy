import { z } from "zod";

export const createStudentDto = z.object({
  // enrollmentDate: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]).optional(),
});

export const updateStudentDto = createStudentDto.partial();

export type ICreateStudent = z.infer<typeof createStudentDto>;
export type IUpdateStudent = z.infer<typeof updateStudentDto>;
