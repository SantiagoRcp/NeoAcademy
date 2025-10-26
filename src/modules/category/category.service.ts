import { Category } from "@prisma/client";
import { CategoryRepository } from "./category.repository";
import { AppError } from "../../utils/AppErrro";
import { IGetCategory } from "./category.types";
import { UpdateCategory } from "./category.dto";

export class CategoryService {
  private categoryRepo: CategoryRepository;

  constructor() {
    this.categoryRepo = new CategoryRepository();
  }

  async createCategory(name: string, description?: string): Promise<Category> {
    const categoryExist = await this.categoryRepo.getCategoryByName(name);

    if (categoryExist) {
      throw new AppError(400, "Existing category");
    }

    return await this.categoryRepo.createCategory(name, description);
  }

  async getCategory(id: number): Promise<Category> {
    const category = await this.categoryRepo.getCategory(id);
    if (!category) {
      throw new AppError(404, "Category no found.");
    }

    return category;
  }

  async getCategorys(page: number, pageSize: number): Promise<IGetCategory> {
    const categories = await this.categoryRepo.getCategorys(page, pageSize);
    if (categories.categories.length === 0) {
      throw new AppError(404, "There are no registered categories");
    }

    return categories;
  }

  async updateCategory(id: number, data: UpdateCategory): Promise<Category> {
    const category = await this.categoryRepo.getCategory(id);
    if (!category) {
      throw new AppError(404, "Category no found.");
    }

    return await this.categoryRepo.updateCategory(id, data);
  }
}
