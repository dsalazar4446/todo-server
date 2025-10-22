import { TagAlreadyExistsError, TaskNotFoundError } from "../../domain/error";
import type { ITaskRepository } from "../repositories/ITaskRepository";

export class AddTagToTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(id: string, tag: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new TaskNotFoundError(id);

    try {
      task.addTag(tag);
      await this.taskRepository.save(task);
    } catch (err: any) {
      if (err instanceof TagAlreadyExistsError) throw err; // rethrow domain error
      throw err;
    }
  }
}
