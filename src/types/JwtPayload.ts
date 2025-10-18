export interface JWTPayload {
  id: number;
  firstName: string;
  email: string;
  roleId: number;
  studentId?: number;
  teacherId?: number;
  iat?: number;
  exp?: number;
}
