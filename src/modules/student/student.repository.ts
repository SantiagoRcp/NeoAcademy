import { Student } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { IGetStudents } from "../admin/admin.types";

export class StudentRepository {
  async getStudenById(id: number): Promise<Student | null> {
    return await prisma.student.findUnique({ where: { id } });
  }
  async getAllStudents(page: number, pageSize: number): Promise<IGetStudents> {
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
}
