import { prisma } from "../../config/prisma";
import { ILoginUser, IRegisterUser } from "../auth/auth.dto";
import { IUser } from "../users/user.types";
import { IStudent } from "../student/student.types";
import { ITeacher } from "../teacher/teacher.types";
import { AppError } from "../../utils/AppErrro";

export class AuthRepository {
  async login(email: string) {
    const userLogin = await prisma.user.findUnique({
      where: { email },
      select: { id: true, firstName: true, email: true, password: true, roleId: true },
    });

    return userLogin;
  }

  async registerUser(data: IRegisterUser): Promise<{ user: IUser; student?: IStudent; teacher?: ITeacher }> {
    let student: IStudent | undefined = undefined;
    let teacher: ITeacher | undefined = undefined;

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new AppError(400, "Email already registered");
    }

    // se utilizan transacciones para evitar datos de usuarios sin su registro de datos en su rol correspondiente
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          avatarUrl: data.avatarUrl,
          dateOfBirth: data.dateOfBirth,
          phone: data.phone,
          address: data.address,
          roleId: data.roleId,
          lastLogin: data.lastLogin,
        },
      });

      if (data.student) {
        student = await tx.student.create({
          data: {
            userId: user.id,
          },
        });
      }

      if (data.teacher) {
        teacher = await tx.teacher.create({
          data: {
            userId: user.id,
            specialization: data.teacher?.specialization,
            bio: data.teacher?.bio,
            experienceYears: data.teacher?.experienceYears,
            linkedinUrl: data.teacher?.linkedinurl,
          },
        });
      }

      return { user, student, teacher };
    });
  }
}
