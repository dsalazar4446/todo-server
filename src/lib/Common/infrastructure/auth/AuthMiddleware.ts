import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { ServiceContainer } from "../../container";
import { AuthService } from "./AuthService";

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    name?: string;
  };
}
export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authService = ServiceContainer.resolve<AuthService>("AuthService");
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing or invalid Authorization header");
    }

    const token = authHeader.split(" ")[1];
    const decoded = await authService.verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message || "Unauthorized" });
  }
}
