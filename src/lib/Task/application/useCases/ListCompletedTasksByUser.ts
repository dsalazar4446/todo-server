import type { Task } from "../../domain";
import type { ITaskRepository } from "../repositories/ITaskRepository";


export class ListCompletedTasksByUser {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<Task[]> {
    const tasks = await this.taskRepository.findByUser(id);
    return tasks.filter((task) => task.getStatus().isCompleted());
  }
}
