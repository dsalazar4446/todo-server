import type { Request, Response } from "express";
import type { DeleteTask } from "../../application/useCases/DeleteTask";
import { BaseController } from "../../../Common/infrastructure/controllers";

export class DeleteTaskController extends BaseController {
  constructor(private readonly useCase: DeleteTask) {super();}

  async executeImpl(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params;
      console.log(req.params);
      
      if (!id) {
        res.status(400).json({ message: "Task id is required" });
        return;
      }
      await this.useCase.execute(id);
      res.status(204).send();
    } catch (error: any) {
      console.log(error);
      
      res.status(500).json({ message: error.message });
    }
  }
}
