import type { ITaskRepository } from "../repositories/ITaskRepository";

export class RemoveAttachmentFromTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(taskId: string, name: string): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found");
    task.removeAttachment(name);
    await this.taskRepository.save(task);
  }
}
