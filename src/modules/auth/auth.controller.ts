import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger.config";
import { IUserRegister } from "./auth.types";
import { ILoginUser, IRegisterUser } from "./auth.dto";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as ILoginUser;
      const data = await this.authService.login({ email, password });
      const { token, user } = data;

      res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

      return res.status(200).json({ message: "Successful login", user });
    } catch (error) {
      logger.error(`Error in login. Error: ${error}`);
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as IRegisterUser;

      //   logger.info(data);
      const user: IUserRegister = await this.authService.registerUser(data);

      return res.status(200).json({ message: "User successfully registered.", user });
    } catch (error) {
      logger.error(`Error registering user.  Error: ${error}`);
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
      });

      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      logger.error(`Error in Logout. Error ${error}`);
      next(error);
    }
  }
}
