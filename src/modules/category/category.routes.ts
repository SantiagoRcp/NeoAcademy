import { Router } from "express";
import { CategoryCntroller } from "./category.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import { zoodMiddleware } from "../../middlewares/zoodMiddleware";
import { createCategoryDto, updateCategoryDto } from "./category.dto";

const categoryRouter = Router();
const category = new CategoryCntroller();

categoryRouter.post(
  "/category",
  authMiddleware,
  checkRole([1]),
  zoodMiddleware(createCategoryDto),
  category.createCategory.bind(category)
);

categoryRouter.get("/category/:id", authMiddleware, category.getCategory.bind(category));
categoryRouter.get("/categories", authMiddleware, category.getCategorys.bind(category));

categoryRouter.put(
  "/category/:id",
  authMiddleware,
  checkRole([1]),
  zoodMiddleware(updateCategoryDto),
  category.updateCategory.bind(category)
);

export default categoryRouter;
