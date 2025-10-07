import { AppError } from "../../utils/AppErrro";
import { IUserUpadate } from "./user.dto";
import { UserRepository } from "./user.repository";
import { IUpdateuser, IUser } from "./user.types";

export class UserServices {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async getProfile(id: number) {
    const userProfile = await this.userRepo.getProfile(id);
    if (!userProfile) {
      throw new AppError(404, "User not found");
    }
    return userProfile;
  }

  async update(id: number, data: IUserUpadate): Promise<IUpdateuser> {
    const userUpdate = await this.userRepo.updateUserData(id, data);
    return userUpdate;
  }

  async suspendAccount(id: number) {
    const accountSuspended = await this.userRepo.suspendAccount(id);
    return accountSuspended;
  }
}
