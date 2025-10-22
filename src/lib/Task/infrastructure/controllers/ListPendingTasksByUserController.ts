import type { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import type { ListPendingTasksByUser } from "../../application";


export class ListPendingTasksByUserController extends BaseController {
  constructor(private readonly useCase: ListPendingTasksByUser) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { email } = (req as any).user
    const tasks = await this.useCase.execute(email);
    res.json(tasks.map((t) => t.toPrimitives()));
  }
}
