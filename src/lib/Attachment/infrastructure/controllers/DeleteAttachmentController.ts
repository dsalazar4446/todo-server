import { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import { DeleteAttachment } from "../../application/useCases/DeleteAttachment";


export class DeleteAttachmentController extends BaseController {
  constructor(private readonly useCase: DeleteAttachment) {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<void | any> {
    const { id } = req.params;
    const { fileName } = req.body;

    if (!fileName) {
       return res.status(400).json({ message: "Missing fileName" });
    }

    await this.useCase.execute(id, fileName);
    res.status(204).send();
  }
}
