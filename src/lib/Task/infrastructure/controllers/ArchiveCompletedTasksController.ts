import type { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import type { ArchiveCompletedTasks } from "../../application";

export class ArchiveCompletedTasksController extends BaseController {
  constructor(private readonly useCase: ArchiveCompletedTasks) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { userEmail } = req.params;
    const count = await this.useCase.execute(userEmail);
    res.json({ message: `${count} tasks archived` });
  }
}
