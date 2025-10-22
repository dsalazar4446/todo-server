import type { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import type { DuplicateTask } from "../../application";

export class DuplicateTaskController extends BaseController {
  constructor(private readonly useCase: DuplicateTask) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const task = await this.useCase.execute(id);
    res.status(201).json(task.toPrimitives());
  }
}
