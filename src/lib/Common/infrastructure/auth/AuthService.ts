// src/core/auth/AuthService.ts
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import ms from "ms";

export class AuthService {
  
  generateToken(payload: Record<string, any>): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expireIn as ms.StringValue,
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch {
      return null;
    }
  }
}
