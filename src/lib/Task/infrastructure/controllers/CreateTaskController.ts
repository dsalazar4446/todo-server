import type { Request, Response } from "express";
import type { CreateTask } from "../../application";
import { BaseController } from "../../../Common/infrastructure/controllers";

export class CreateTaskController extends BaseController {
  constructor(private readonly useCase: CreateTask) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    
    const { title, description, userEmail } = req.body;
    if (!title || !userEmail) {
      res.status(400).json({ message: "Title and userEmail are required" });
      return;
    }

    const task = await this.useCase.execute({ title, description, userEmail });
    res.status(201).json(task.toPrimitives());
  }
}
