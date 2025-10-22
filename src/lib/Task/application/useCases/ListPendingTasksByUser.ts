import type { Task } from "../../domain";
import type { ITaskRepository } from "../repositories/ITaskRepository";

export class ListPendingTasksByUser {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(userEmail: string): Promise<Task[]> {
    const tasks = await this.taskRepository.findByUser(userEmail);
    return tasks.filter((task) => !task.getStatus().isCompleted());
  }
}
