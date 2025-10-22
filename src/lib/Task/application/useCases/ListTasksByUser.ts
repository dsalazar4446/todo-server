import type { Task } from "../../domain";
import type { ITaskRepository } from "../repositories/ITaskRepository";


export class ListTasksByUser {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(userEmail: string): Promise<Task[]> {
    return this.taskRepository.findByUser(userEmail);
  }
}
