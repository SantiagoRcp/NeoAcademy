import { AppError } from "../../utils/AppErrro";
import { hashedPassword } from "../../utils/bcryptjs";
import { IUserUpadate } from "./user.dto";
import { UserRepository } from "./user.repository";
import { IUpdateuser, IUser } from "./user.types";

export class UserServices {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async getProfile(id: number): Promise<IUser> {
    const userProfile = await this.userRepo.getProfile(id);
    if (!userProfile) {
      throw new AppError(404, "User not found");
    }
    return userProfile;
  }

  async updateUser(id: number, data: IUserUpadate): Promise<IUpdateuser> {
    if (data.password) {
      let hasPassword;
      hasPassword = await hashedPassword(data.password);
      data.password = hasPassword;
    }

    const userUpdate = await this.userRepo.updateUserData(id, data);
    return userUpdate;
  }

  async suspendAccount(id: number) {
    const accountSuspended = await this.userRepo.suspendAccount(id);
    return accountSuspended;
  }

  async reactivateAccount(email: string) {
    const user = await this.userRepo.getUserByEmail(email);

    if (!user) {
      throw new AppError(404, "User no found");
    }

    if (user.active === "ACTIVE") {
      throw new AppError(400, "Your acount is active.");
    }

    return await this.userRepo.reactivateAccount(user.id);
  }
}
