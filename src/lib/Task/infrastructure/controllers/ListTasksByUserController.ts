import type { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import type { ListTasksByUser } from "../../application";

export class ListTasksByUserController extends BaseController {
  constructor(private readonly useCase: ListTasksByUser) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const {email} = (req as any).user;
    const tasks = await this.useCase.execute(email);
    res.json(tasks.map((t) => t.toPrimitives()));
  }
}
