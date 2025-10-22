import type { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import type { SearchTasks } from "../../application";

export class SearchTasksController extends BaseController {
  constructor(private readonly useCase: SearchTasks) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { email } = (req as any).user
    const { q } = req.query;
    if (!q) {
      res.status(400).json({ message: "Search query (q) is required" });
      return;
    }

    const tasks = await this.useCase.execute(email, q as string);
    res.json(tasks.map((t) => t.toPrimitives()));
  }
}
