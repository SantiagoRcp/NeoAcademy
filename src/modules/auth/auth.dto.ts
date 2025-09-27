import { z } from "zod";
import { CreateUserDto } from "../users/user.dto";
import { CreateStudentDto } from "../student/student.dto";
import { CreateTeacherDto } from "../teacher/teacher.dto";

export const LoginUserDto = z.object({
  email: z.string().min(1, "email is Required").email("Invalid email").trim(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_?]).+$/,
      "Password must contain at least one uppercase letter, on number, and one special character !@#$%^&*()_?"
    )
    .min(8, "password must be at least 8 characters long")
    .trim(),
});

export const RegisterUserDto = CreateUserDto.extend({
  student: CreateStudentDto.optional(),
  teacher: CreateTeacherDto.optional(),
}).superRefine((data, ctx) => {
  switch (data.roleId) {
    case 1:
      if (data.student || data.teacher) {
        ctx.addIssue({ code: "custom", message: "Admins should not have student or teacher data" });
      }
      break;

    case 2:
      if (!data.student) {
        ctx.addIssue({ code: "custom", message: "Student data is required when role is Student" });
      }

      if (data.teacher) {
        ctx.addIssue({ code: "custom", message: "Student role cannot include teacher data" });
      }
      break;

    case 3:
      if (!data.teacher) {
        ctx.addIssue({ code: "custom", message: "Teacher data is required when role is Teacher" });
      }

      if (data.student) {
        ctx.addIssue({ code: "custom", message: "Teacher role cannot include student data" });
      }
      break;

    default:
      ctx.addIssue({ code: "custom", message: "Role not supported" });
      break;
  }
});

export type IRegisterUser = z.infer<typeof RegisterUserDto>;
export type ILoginUser = z.infer<typeof LoginUserDto>;
