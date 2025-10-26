import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./category.service";
import { CreateCategory, UpdateCategory } from "./category.dto";

export class CategoryCntroller {
  private categoryserv: CategoryService;

  constructor() {
    this.categoryserv = new CategoryService();
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as CreateCategory;
      const category = await this.categoryserv.createCategory(data.name, data.description);
      return res.status(200).json({ message: "Category successfully registered.", category });
    } catch (error) {
      next(error);
    }
  }

  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const category = await this.categoryserv.getCategory(id);
      return res.status(200).json({ message: "Category found.", category });
    } catch (error) {
      next(error);
    }
  }

  async getCategorys(req: Request, res: Response, next: NextFunction) {
    try {
      // pagina a obtener.
      const page = req.params.page ? Number(req.params.page) : 1;

      //  total de elementos por pagina.
      const pageSize = req.params.pageSize ? Number(req.params.pageSize) : 10;

      const categories = await this.categoryserv.getCategorys(page, pageSize);

      return res.status(200).json({ message: "Categories", categories });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = req.body as UpdateCategory;

      const category = await this.categoryserv.updateCategory(id, data);
      return res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
      next(error);
    }
  }
}
