import type { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import type { ListCompletedTasksByUser } from "../../application";

export class ListCompletedTasksByUserController extends BaseController {
  constructor(private readonly useCase: ListCompletedTasksByUser) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { email } = (req as any).user;
    
    const tasks = await this.useCase.execute(email);
    res.json(tasks.map((t) => t.toPrimitives()));
  }
}
