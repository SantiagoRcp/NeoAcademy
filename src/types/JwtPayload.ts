export interface JWTPayload {
  id: number;
  firstName: string;
  email: string;
  roleId: number;
  iat?: number;
  exp?: number;
}
