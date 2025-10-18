import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../config/logger.config";
import { JWT_SECRET } from "../config";
import { AppError } from "../utils/AppErrro";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    logger.warn("No token provided in request");
    return next(new AppError(401, "Authentication failed: No token provided"));
  }

  jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null) => {
    if (err) {
      logger.warn("Invalid token", { error: err });
      return next(new AppError(401, "Authentication failed: Invalid token"));
    }
  });

  const decodedToken: any = jwt.verify(token, JWT_SECRET);
  req.user = decodedToken;
  next();
}

export function checkRole(roles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, "Authorization failed: User data missing. Ensure authMiddleware is run first."));
    }

    const role = req.user.roleId;
    if (!roles.includes(role)) {
      return next(new AppError(403, "Access denied: User role not authorized for this resource."));
    }

    next();
  };
}
