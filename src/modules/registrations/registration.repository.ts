import { Registration } from "@prisma/client";
import { prisma } from "../../config/prisma";

export class RegistrationRepository {
  async registerForCourse(studentId: number, courseId: number): Promise<Registration> {
    return await prisma.registration.create({ data: { studentId, courseId, paymentStatus: "PAID", status: "ACTIVE" } });
  }

  // Get registration information by id
  async getRegistrationById(id: number) {
    const registration = await prisma.registration.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            category: { omit: { createdAt: true, description: true, updatedAt: true } },
            teacher: {
              include: {
                user: { select: { firstName: true, lastName: true } },
              },
              omit: { bio: true, experienceYears: true, hiredAt: true, linkedinUrl: true, specialization: true },
            },
          },
          omit: { createdAt: true, updatedAt: true, teacherId: true },
        },
        student: {
          include: {
            user: {
              omit: {
                address: true,
                avatarUrl: true,
                createdAt: true,
                dateOfBirth: true,
                email: true,
                password: true,
                lastLogin: true,
                phone: true,
                roleId: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    return registration;
  }

  // Get student course information
  // falta paginacion
  async getStudentCourses(studentId: number) {
    const studentRegisInfoCourse = await prisma.registration.findMany({
      where: { studentId },
      include: {
        course: {
          include: {
            category: { omit: { createdAt: true, description: true, updatedAt: true } },
            teacher: {
              include: {
                user: {
                  select: { firstName: true, lastName: true },
                },
              },
              omit: { bio: true, experienceYears: true, hiredAt: true, linkedinUrl: true, specialization: true },
            },
          },
          omit: { createdAt: true, updatedAt: true, teacherId: true },
        },
      },
    });

    return studentRegisInfoCourse;
  }

  // Get course registration information
  // falta paginacion
  async getCourseRecords(courseId: number) {
    const courseRegistrationInfo = await prisma.registration.findMany({
      where: { courseId },
      include: {
        course: {
          omit: { createdAt: true, updatedAt: true },
          include: {
            teacher: { omit: { bio: true, experienceYears: true, hiredAt: true, linkedinUrl: true, specialization: true } },
            category: { omit: { createdAt: true, description: true, updatedAt: true } },
          },
        },
        student: {
          omit: { enrollmentDate: true },
          include: {
            user: {
              omit: {
                address: true,
                avatarUrl: true,
                createdAt: true,
                dateOfBirth: true,
                email: true,
                password: true,
                lastLogin: true,
                phone: true,
                roleId: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    return courseRegistrationInfo;
  }
}
