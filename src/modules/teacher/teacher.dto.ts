import {z} from "zod";

export const CreateTeacherDto = z.object({
  specialization: z.string().min(1, "specialization is required").trim(),
  bio: z.string().min(1, "bio is required").trim(),
  experienceYears: z.number().min(0, "experienceYears is required"),
  linkedinurl: z.string().url("Invalid URL").trim().optional(),
  // hiredAt: z.string(),
  // status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]).optional(),
});


export type ICreateTeacher = z.infer<typeof CreateTeacherDto>;