import { AppError } from "../../utils/AppErrro";
import { UserRepository } from "./user.repository";
import { IUser } from "./user.types";

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

  async getAllUsers() {}
}
