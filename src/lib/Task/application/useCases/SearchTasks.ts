import type { Task } from "../../domain";
import type { ITaskRepository } from "../repositories/ITaskRepository";


export class SearchTasks {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(userEmail: string, query: string): Promise<Task[]> {
    const tasks = await this.taskRepository.findByUser(userEmail);
    const term = query.trim().toLowerCase();

    return tasks.filter(
      (task) =>
        task.getTitle().getValue().toLowerCase().includes(term) ||
        task.getDescription().getValue().toLowerCase().includes(term)
    );
  }
}
