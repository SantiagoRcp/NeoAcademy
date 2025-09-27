import { IUser } from "../users/user.types";
import { IStudent } from "../student/student.types";
import { ITeacher } from "../teacher/teacher.types";

export interface IUserRegister {
  user: IUser;
  student?: IStudent;
  teacher?: ITeacher;
}

export interface Ilogin {
  id: number;
  rolId: number;
  firstName: string;
  email: string;
}
