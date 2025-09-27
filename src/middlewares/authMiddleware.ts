import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../config/logger.config";
import { JWT_SECRET } from "../config";
import { AppError } from "../utils/AppErrro";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token ;
    if (!token) {
      logger.warn("No token provided in request");
      throw new AppError(401, "Authentication failed: No token provided");
    }

    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    logger.error(`Error in auth middleware, ${ error }`);
    throw new AppError(401, "Authentication failed: Invalid or expired token");
  }
}

export function checkRole(roles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError(401, "Authorization failed: User data missing. Ensure authMiddleware is run first.");
      }

      const role = req.user.roleId;
      if (!roles.includes(role)) {
        throw new AppError(403, "Access denied: User role not authorized for this resource.");
      }

      next();
    } catch (error) {
      logger.error("Error in checkRole middleware", { error });
      throw new AppError(403, "Access to this resource is forbidden.");
    }
  };
}
