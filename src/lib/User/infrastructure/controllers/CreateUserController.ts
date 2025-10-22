import type { NextFunction, Request, Response } from "express";
import type { CreateUser } from "../../application/useCases/CreateUser";
import { BaseController } from "../../../Common/infrastructure/controllers";
import { AuthService } from "../../../Common/infrastructure/auth/AuthService";
import { ServiceContainer } from "../../../Common/container";

export class CreateUserController extends BaseController {
  private authService: AuthService = ServiceContainer.resolve("AuthService");

  constructor(private readonly useCase: CreateUser) {
    super();
  }

  protected async executeImpl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
      }
      const token = this.authService.generateToken({ email });
      const user = await this.useCase.execute(email);
      res.status(201).json({ user: { ...user.toPrimitives() }, token });
    } catch (error: any) {
      next(error);
    }
  }
}
