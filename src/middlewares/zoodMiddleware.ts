import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppErrro";
import z from "zod";

export function zoodMiddleware(schemaUser: z.ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schemaUser.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ Message: "Invalid Data", errors: result.error.issues.map((issue) => issue.message) });
      }

      req.body = result.data;
      next();
    } catch (error) {
      next(new AppError(500, `Internal Server Error Zood ${error}`));
    }
  };
}
