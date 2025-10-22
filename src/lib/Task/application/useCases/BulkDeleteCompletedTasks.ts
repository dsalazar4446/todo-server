import type { ITaskRepository } from "../repositories/ITaskRepository";

export class BulkDeleteCompletedTasks {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(userEmail: string): Promise<number> {
    const tasks = await this.taskRepository.findByUser(userEmail);
    const completed = tasks.filter((task) => task.getStatus().isCompleted());

    for (const task of completed) {
      await this.taskRepository.delete(task.getId().getValue());
    }

    return completed.length;
  }
}
