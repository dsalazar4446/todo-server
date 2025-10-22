import type { Request, Response } from "express";
import type { GetUserByEmail } from "../../application/useCases/GetUserByEmail";
import { BaseController } from "../../../Common/infrastructure/controllers";
import { ServiceContainer } from "../../../Common/container";
import { AuthService } from "../../../Common/infrastructure/auth/AuthService";

export class GetUserByEmailController extends BaseController {
  private authService: AuthService = ServiceContainer.resolve("AuthService");
  constructor(private readonly useCase: GetUserByEmail) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    const authorization = req.headers.authorization
       

    if (!email) {
      res.status(400).json({ message: "Email param is required" });
      return;
    }
    let token;
    if (!authorization) {
      token = this.authService.generateToken({ email });
    }

    const user = await this.useCase.execute(email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    token ? res.json({user:{...user.toPrimitives()}, token}) : res.json({user:{...user.toPrimitives()}});
    
  }
}
