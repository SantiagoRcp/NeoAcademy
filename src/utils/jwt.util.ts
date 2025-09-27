import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/JwtPayload";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config";

export function generatedToken(payload: JWTPayload): string {
  const secret: jwt.Secret = JWT_SECRET;
  const expire = JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];
  const token = jwt.sign(payload, secret, { expiresIn: expire });
  return token;
}
