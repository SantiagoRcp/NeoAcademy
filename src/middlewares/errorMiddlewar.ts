import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppErrro";

export function errorMiddleware(error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  //Comprobamos que el error sea una instancia de AppError y si no lo es lo convertimos
  const errorHandler = error instanceof AppError ? error : new AppError(500, "Internal Server Error", false);

  const response = {
    status: errorHandler.statusCode,
    message: errorHandler.message,
    ...(process.env.DEV === "development" && { stack: error.stack }),
  };

  return res.status(errorHandler.statusCode).json(response);
}
