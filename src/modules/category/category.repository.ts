import { Category } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { IGetCategory } from "./category.types";
import { UpdateCategory } from "./category.dto";

export class CategoryRepository {
  async createCategory(name: string, description?: string): Promise<Category> {
    return await prisma.category.create({ data: { name, description } });
  }

  async getCategorys(page: number, pageSize: number): Promise<IGetCategory> {
    const skip = (page - 1) * pageSize;
    const [categories, totalCategory] = await prisma.$transaction([
      prisma.category.findMany({ skip, take: pageSize, orderBy: { createdAt: "desc" } }),
      prisma.category.count(),
    ]);

    const totalPage = Math.ceil(totalCategory / pageSize);
    return { categories, totalCategory, totalPage, currenPage: page };
  }

  async getCategory(id: number): Promise<Category | null> {
    return await prisma.category.findUnique({ where: { id } });
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    return await prisma.category.findFirst({ where: { name } });
  }

  async updateCategory(id: number, data: UpdateCategory): Promise<Category> {
    return await prisma.category.update({ where: { id }, data });
  }
}
