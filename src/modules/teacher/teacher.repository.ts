import { Teacher } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { IUpdateTeacher } from "./teacher.dto";
import { ITeacherUpdate } from "./teacher.types";
import { IGetTeachers } from "../admin/admin.types";

export class TeacherRepository {
  async getTEacherById(id: number): Promise<Teacher | null> {
    return await prisma.teacher.findUnique({ where: { id } });
  }

  async getAllTeacher(page: number, pageSize: number): Promise<IGetTeachers> {
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

  async getTeacherPending(page: number, pageSize: number): Promise<IGetTeachers> {
    const skip = (page - 1) * pageSize;

    const [teacherPending, totalTeachers] = await prisma.$transaction([
      prisma.teacher.findMany({
        where: { status: "PENDING" },
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, email: true, phone: true, roleId: true, active: true },
          },
        },
        take: pageSize,
        skip,
        orderBy: { hiredAt: "desc" },
      }),
      prisma.teacher.count({ where: { status: "PENDING" } }), // Obtiene el total de elementos.
    ]);
    const totalPage = Math.ceil(totalTeachers / pageSize);

    return { teachers: teacherPending, totalTeachers, totalPage, currentPage: page };
  }

  async acceptTeacher(id: number) {
    return await prisma.teacher.update({
      where: { id },
      data: { status: "ACTIVE" },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true, active: true } },
      },
    });
  }

  async updatedTeacherById(teacherId: number, data: IUpdateTeacher): Promise<ITeacherUpdate> {
    const { specialization, bio, experienceYears, linkedinUrl, status } = data;

    const teacher = await prisma.teacher.update({
      where: { id: teacherId },
      data: { specialization, bio, experienceYears, linkedinUrl, status },
    });

    return teacher;
  }
}
