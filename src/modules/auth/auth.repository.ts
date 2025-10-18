import { prisma } from "../../config/prisma";
import { IRegisterUser } from "../auth/auth.dto";
import { IUser } from "../users/user.types";
import { IStudent } from "../student/student.types";
import { ITeacher } from "../teacher/teacher.types";
import { AppError } from "../../utils/AppErrro";

export class AuthRepository {
  async login(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, firstName: true, email: true, password: true, roleId: true },
    });

    if (!user) {
      throw new AppError(404, "User no found.");
    }

    switch (user.roleId) {
      case 1:
        return { user };

      case 2:
        const student = await prisma.student.findFirst({
          where: { userId: user.id },
          select: { id: true, status: true },
        });
        return { user, student };

      case 3:
        const teacher = await prisma.teacher.findFirst({
          where: { userId: user.id },
          select: { id: true, status: true },
        });
        return { user, teacher };
    }
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
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          avatarUrl: true,
          dateOfBirth: true,
          phone: true,
          address: true,
          active: true,
          role: true,
          createdAt: true,
          updatedAt: true,
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
            linkedinUrl: data.teacher?.linkedinUrl,
          },
        });
      }

      return { user, student, teacher };
    });
  }
}
