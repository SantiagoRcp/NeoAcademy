import { UserStstus } from "@prisma/client";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatarUrl?: string | null;
  dateOfBirth: Date;
  phone: string;
  address: string;
  roleId?: number;
  active: UserStstus;
  lastLogin?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateuser extends Partial<IUser> {}
