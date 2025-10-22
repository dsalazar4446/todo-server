import { Task } from "../../domain";
import type { ITaskRepository } from "../repositories/ITaskRepository";


export class DuplicateTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<Task> {
    const existing = await this.taskRepository.findById(taskId);
    if (!existing) throw new Error("Task not found");

    const copy = Task.create({
      title: `${existing.getTitle().getValue()} (Copy)`,
      description: existing.getDescription().getValue(),
      userEmail: existing.getUserEmail().getValue(),
    });

    await this.taskRepository.save(copy);
    return copy;
  }
}
