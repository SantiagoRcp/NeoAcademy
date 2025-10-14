import { z } from "zod";

export const CreateTeacherDto = z.object({
  specialization: z.string().min(1, "specialization is required").trim(),
  bio: z.string().min(1, "bio is required").trim(),
  experienceYears: z.number().min(0, "experienceYears is required"),
  linkedinUrl: z.string().url("Invalid URL").trim().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]).optional(),
  // hiredAt: z.string(),
});

export const UpdateTeacherDto = CreateTeacherDto.partial();

export type IUpdateTeacher = z.infer<typeof UpdateTeacherDto>;
export type ICreateTeacher = z.infer<typeof CreateTeacherDto>;
