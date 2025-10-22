import type { ITaskRepository } from "../repositories/ITaskRepository";

export class UpdateTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(
    taskId: string,
    data: { title?: string; description?: string }
  ): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found");

    if (data.title) task.updateTitle(data.title);
    if (data.description !== undefined)
      task.updateDescription(data.description);

    await this.taskRepository.save(task);
  }
}
