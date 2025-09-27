import { z } from "zod";

export const CreateStudentDto = z.object({
  // enrollmentDate: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]).optional(),
});

export type ICreateStudent = z.infer<typeof CreateStudentDto>;
