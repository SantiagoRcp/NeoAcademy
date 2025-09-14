export interface JWTPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
