import type { Request, Response } from "express";
import type { AddTagToTask } from "../../application";
import { BaseController } from "../../../Common/infrastructure/controllers";


export class AddTagToTaskController extends BaseController {
  constructor(private readonly useCase: AddTagToTask) {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { tag } = req.body;
      if (!tag) {
        res.status(400).json({ message: "Tag is required" });
        return;
      }

      await this.useCase.execute(id, tag);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
