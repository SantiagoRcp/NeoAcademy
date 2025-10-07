export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string | null;
  phone: string;
  roleId: number;
  lastLogin?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateuser {
  firstName?: string;
  lastName?: string;
  password?: string;
  avatarUrl?: string | null;
  dateOfBirth: Date;
  phone?: string;
  address: string;
}
