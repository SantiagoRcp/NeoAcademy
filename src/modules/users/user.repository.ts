import { prisma } from "../../config/prisma";
import { IUserUpadate } from "./user.dto";
import { IUpdateuser, IUser } from "./user.types";

export class UserRepository {
  async getUserId(id: number): Promise<IUser | null> {
    return await prisma.user.findUnique({ where: { id }, omit: { password: true } });
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({ where: { email }, omit: { password: true } });
  }

  async getProfile(id: number): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
      include: { Student: true, Teacher: true },
    });

    return user;
  }

  async updateUserData(id: number, data: IUserUpadate): Promise<IUpdateuser> {
    const upadateUser = await prisma.user.update({
      where: { id },
      data,
    });

    return upadateUser;
  }

  async suspendAccount(id: number) {
    const accountSuspended = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({ where: { id }, data: { active: "INACTIVE" } });

      if (user.roleId === 2) {
        await tx.student.updateMany({ where: { userId: user.id }, data: { status: "INACTIVE" } });
      }

      if (user.roleId === 3) {
        await tx.teacher.updateMany({ where: { userId: user.id }, data: { status: "INACTIVE" } });
      }

      const fullName = user.firstName + " " + user.lastName;

      return {
        message: "Account suspended",
        user: { id: user.id, fullName, email: user.email, status: user.active },
      };
    });

    return accountSuspended;
  }

  //ACtivarCuenta
  async reactivateAccount(id: number) {
    const activatedAccount = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({ where: { id }, data: { active: "ACTIVE" } });

      if (user.roleId === 2) {
        await tx.student.updateMany({ where: { userId: user.id }, data: { status: "ACTIVE" } });
      }

      if (user.roleId === 3) {
        await tx.teacher.updateMany({ where: { userId: user.id }, data: { status: "ACTIVE" } });
      }

      const fullName = user.firstName + " " + user.lastName;

      return {
        message: "Account active",
        user: { id: user.id, fullName, email: user.email, status: user.active },
      };
    });

    return activatedAccount;
  }
}
