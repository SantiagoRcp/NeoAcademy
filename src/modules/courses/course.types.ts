import { Course } from "@prisma/client";

export interface IGetCourses {
  courses: Course[];
  totalCourses: number;
  totalPage: number;
  currentPage: number;
}
