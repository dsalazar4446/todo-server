import type { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import type { ToggleTask } from "../../application";

export class ToggleTaskController extends BaseController {
  constructor(private readonly useCase: ToggleTask) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.useCase.execute(id);
    res.status(204).send();
  }
}
