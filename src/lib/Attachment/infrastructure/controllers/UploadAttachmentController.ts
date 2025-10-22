import { Request, Response } from "express";
import { BaseController } from "../../../Common/infrastructure/controllers";
import { UploadAttachment } from "../../application/useCases/UploadAttachment";
;

export class UploadAttachmentController extends BaseController {
  constructor(private readonly useCase: UploadAttachment) {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const file = req.file as Express.Multer.File;

    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
    }

    const attachment = await this.useCase.execute(id, file);
    res.status(201).json(attachment.toPrimitives());
  }
}
