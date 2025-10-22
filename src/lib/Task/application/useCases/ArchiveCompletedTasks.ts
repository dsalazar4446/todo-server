import type { ITaskRepository } from "../repositories/ITaskRepository";

export class ArchiveCompletedTasks {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(userEmail: string): Promise<number> {
    const tasks = await this.taskRepository.findByUser(userEmail);
    const completed = tasks.filter((task) => task.getStatus().isCompleted());

    for (const task of completed) {
      task.updateDescription(`[ARCHIVED] ${task.getDescription().getValue()}`);
      await this.taskRepository.save(task);
    }

    return completed.length;
  }
}
