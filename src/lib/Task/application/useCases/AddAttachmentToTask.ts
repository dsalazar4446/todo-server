import type { ITaskRepository } from "../repositories/ITaskRepository";

export class AddAttachmentToTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(
    taskId: string,
    file: { url: string; name: string }
  ): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found");
    task.addAttachment(file);
    await this.taskRepository.save(task);
  }
}
