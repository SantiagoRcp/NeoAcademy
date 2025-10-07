import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppErrro";

export class AdminRepository {
  async getAllStudents(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [students, totalStudents] = await prisma.$transaction([
      prisma.student.findMany({
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, email: true, phone: true, roleId: true, active: true },
          },
        },
        take: pageSize,
        skip,
        orderBy: { enrollmentDate: "desc" },
      }),
      prisma.student.count(), // Obtiene el total de elementos.
    ]);

    const totalPage = Math.ceil(totalStudents / pageSize);

    return { students, totalStudents, totalPage, currentpage: page };
  }

  async getAllTeacher(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [teachers, totalTeachers] = await prisma.$transaction([
      prisma.teacher.findMany({
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, email: true, phone: true, roleId: true, active: true },
          },
        },

        take: pageSize,
        skip,
        orderBy: { hiredAt: "desc" },
      }),
      prisma.teacher.count(), // Obtiene el total de elementos.
    ]);

    const totalPage = Math.ceil(totalTeachers / pageSize);

    return { teachers, totalTeachers, totalPage, currentPage: page };
  }

  async getTeacherPending(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [teacherPending, totalTeachersPending] = await prisma.$transaction([
      prisma.teacher.findMany({
        where: { status: "PENDING" },
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, active: true } },
        },
        take: pageSize,
        skip,
        orderBy: { hiredAt: "desc" },
      }),
      prisma.teacher.count({ where: { status: "PENDING" } }), // Obtiene el total de elementos.
    ]);
    const totalPage = Math.ceil(totalTeachersPending / pageSize);

    return { teacherPending, totalTeachersPending, totalPage, currentPage: page };
  }

  async acceptTeacher(id: number) {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) {
      throw new AppError(404, "Teacher not found.");
    }

    if (teacher.status !== "PENDING") {
      throw new AppError(400, "Teacher is no PENDING");
    }
    return await prisma.teacher.update({
      where: { id },
      data: { status: "ACTIVE" },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, active: true } },
      },
    });
  }
}
