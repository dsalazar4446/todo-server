import type { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import type { UpdateTask } from "../../application";

export class UpdateTaskController extends BaseController {
  constructor(private readonly useCase: UpdateTask) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, description } = req.body;
    await this.useCase.execute(id, { title, description });
    res.status(204).send();
  }
}
