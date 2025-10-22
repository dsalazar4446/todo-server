import type { Task } from "../../domain";
import type { ITaskRepository } from "../repositories/ITaskRepository";

export class ListTasksByDateRange {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(userEmail: string, from: Date, to: Date): Promise<Task[]> {
    const tasks = await this.taskRepository.findByUser(userEmail);
    return tasks.filter((task) => {
      const created = task.getTimestamps().getCreatedAt().getTime();
      return created >= from.getTime() && created <= to.getTime();
    });
  }
}
