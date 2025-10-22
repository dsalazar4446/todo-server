
import type { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import type { BulkDeleteCompletedTasks } from "../../application";
export class BulkDeleteCompletedTasksController extends BaseController {
  constructor(private readonly useCase: BulkDeleteCompletedTasks) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { userEmail } = req.params;
    const count = await this.useCase.execute(userEmail);
    res.json({ message: `${count} completed tasks deleted` });
  }
}
