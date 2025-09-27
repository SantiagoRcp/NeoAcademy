import { prisma } from "../../config/prisma";

export class UserRepository {
  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async getProfile(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        roleId: true,
        firstName: true,
        lastName: true,
        email: true,
        address: true,
        avatarUrl: true,
        createdAt: true,
        phone: true,
        Student: true,
        Teacher: true,
      },
    });

    return user;
  }
}
