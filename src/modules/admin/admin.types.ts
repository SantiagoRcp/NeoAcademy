import { Student, Teacher } from "@prisma/client";

export interface IGetStudents {
  students: (Student & {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      roleId: number;
      active: "ACTIVE" | "INACTIVE" | "PENDING";
    };
  })[];
  totalStudents: number;
  totalPage: number;
  currentpage: number;
}

export interface IGetTeachers {
  teachers: (Teacher & {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      roleId: number;
      active: "ACTIVE" | "INACTIVE" | "PENDING";
    };
  })[];
  totalTeachers: number;
  totalPage: number;
  currentPage: number;
}
