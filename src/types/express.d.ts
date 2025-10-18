namespace Express {
  export interface Request {
    user?: {
      id: number;
      roleId: number;
      firstName: string;
      email: string;
      studentId?: number;
      teacherId?: number;
    };
  }
}
