import type { Request, Response } from "express";
import type { RemoveAttachmentFromTask } from "../../application";
import { BaseController } from "../../../Common/infrastructure/controllers";

export class RemoveAttachmentFromTaskController extends BaseController {
  constructor(private readonly useCase: RemoveAttachmentFromTask) {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await this.useCase.execute(id, name);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
