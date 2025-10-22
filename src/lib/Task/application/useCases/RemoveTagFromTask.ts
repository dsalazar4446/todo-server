import type { ITaskRepository } from "../repositories/ITaskRepository";

export class RemoveTagFromTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(taskId: string, tag: string): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found");
    task.removeTag(tag);
    await this.taskRepository.save(task);
  }
}
