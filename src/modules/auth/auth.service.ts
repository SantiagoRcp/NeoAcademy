import { AuthRepository } from "./auth.repository";
import { ILoginUser, IRegisterUser } from "./auth.dto";
import { IUserRegister } from "./auth.types";
import { comparePassword, hashedPassword } from "../../utils/bcryptjs";
import { AppError } from "../../utils/AppErrro";
import { JWTPayload } from "../../types/JwtPayload";
import { generatedToken } from "../../utils/jwt.util";

export class AuthService {
  private authRepo: AuthRepository;

  constructor() {
    this.authRepo = new AuthRepository();
  }

  async login(data: ILoginUser) {
    const loginUser = await this.authRepo.login(data.email);

    if (!loginUser) {
      throw new AppError(400, "User not found");
    }

    const { password, ...user } = loginUser;
    const isPassword = await comparePassword(data.password, password);
    if (!isPassword) {
      throw new AppError(401, "Invalid credentials");
    }

    const payload: JWTPayload = {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      roleId: user.roleId,
    };

    const token = generatedToken(payload);
    return { user, token };
  }

  async registerUser(data: IRegisterUser): Promise<IUserRegister> {
    const { student, teacher } = data;

    if (!student && !teacher) {
      throw new AppError(400, "Role information is missing.");
    }

    const password = await hashedPassword(data.password);
    data.password = password;

    const user: IUserRegister = await this.authRepo.registerUser(data);

    if (!user) {
      throw new AppError(400, "An error occurred while registering the user.");
    }

    return user;
  }
}
