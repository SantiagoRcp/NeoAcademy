import logger from "../config/logger.config";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean = true;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    // define el prototipo explícitamente
    Object.setPrototypeOf(this, AppError.prototype);
    // captura la traza de la pila
    Error.captureStackTrace(this, this.constructor);
  }
}
