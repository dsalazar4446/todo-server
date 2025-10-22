import type { Request, Response } from "express";
import type { RemoveTagFromTask } from "../../application";
import { BaseController } from "../../../Common/infrastructure/controllers";

export class RemoveTagFromTaskController extends BaseController {
  constructor(private readonly useCase: RemoveTagFromTask) {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { tag } = req.body;
      await this.useCase.execute(id, tag);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

