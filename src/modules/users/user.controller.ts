import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger.config";
import { UserServices } from "./user.service";
import { AppError } from "../../utils/AppErrro";

export class UserController {
  private userService: UserServices;

  constructor() {
    this.userService = new UserServices();
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new AppError(400, "Invalid User id");
      }

      const profile = await this.userService.getProfile(id);
      return res.status(200).json({ message: "profile obtained successfully", profile });
    } catch (error) {
      logger.error(`Error Getting Profile. Error: ${error}`);
      next(error);
    }
  }
}
