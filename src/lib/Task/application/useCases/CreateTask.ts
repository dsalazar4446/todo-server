import { Task } from "../../domain";
import type { ITaskRepository } from "../repositories/ITaskRepository";

export class CreateTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(params: {
    title: string;
    description: string;
    userEmail: string;
  }): Promise<Task> {
    const task = Task.create({
      title: params.title,
      description: params.description,
      userEmail: params.userEmail,
    });

    await this.taskRepository.save(task);
    return task;
  }
}
