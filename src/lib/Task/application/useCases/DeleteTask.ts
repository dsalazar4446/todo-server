import type { ITaskRepository } from "../repositories/ITaskRepository";

export class DeleteTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}
