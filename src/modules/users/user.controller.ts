import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger.config";
import { UserServices } from "./user.service";
import { AppError } from "../../utils/AppErrro";
import { IUserUpadate } from "./user.dto";

export class UserController {
  private userService: UserServices;

  constructor() {
    this.userService = new UserServices();
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id;

      if (!id || !Number.isInteger(id)) {
        throw new AppError(400, "Invalid User id");
      }

      const profile = await this.userService.getProfile(id);
      return res.status(200).json({ message: "profile obtained successfully", profile });
    } catch (error) {
      logger.error(`Error Getting Profile. Error: ${error}`);
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as IUserUpadate;
      const id = parseInt(req.params.id);

      if (!id || Number.isInteger(id)) {
        throw new AppError(400, "Invalid User id");
      }

      const userUpdated = await this.userService.update(id, data);
      return res.status(200).json({ message: "User updated successfully", userUpdated });
    } catch (error) {
      logger.error(`Error Update user. Error: ${error}`);
      next(error);
    }
  }

  async suspendAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (!id || Number.isInteger(id)) {
        throw new AppError(400, "Invalid User id");
      }

      const accountSuspended = await this.userService.suspendAccount(id);
      return res.status(200).json(accountSuspended);
    } catch (error) {
      logger.error(`Error suspend Account ${error}`);
      next(error);
    }
  }
}
