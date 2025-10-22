import type { Request, Response } from "express";
import type { AddAttachmentToTask } from "../../application";
import { BaseController } from "../../../Common/infrastructure/controllers";

export class AddAttachmentToTaskController extends BaseController {
  constructor(private readonly useCase: AddAttachmentToTask) {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { url, name } = req.body;
      if (!url || !name) {
        res.status(400).json({ message: "url and name are required" });
        return;
      }

      await this.useCase.execute(id, { url, name });
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
