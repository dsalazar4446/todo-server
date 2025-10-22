import { TaskNotFoundError } from "../../domain/error";
import type { ITaskRepository } from "../repositories/ITaskRepository";

export class ToggleTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new TaskNotFoundError(id);

    task.toggleStatus();
    await this.taskRepository.save(task);
  }
}
