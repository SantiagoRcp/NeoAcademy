import { Category } from "@prisma/client";

export interface IGetCategory {
  categories: Category[];
  totalPage: number;
  totalCategory: number;
  currenPage: number;
}