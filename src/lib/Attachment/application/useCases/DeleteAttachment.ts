import { ITaskRepository } from "../../../Task";
import { TaskNotFoundError } from "../../../Task/domain/error";
import { IAttachmentStorageService } from "../../application/services/IAttachmentStorageService";

export class DeleteAttachment {
  constructor(
    private readonly taskRepo: ITaskRepository,
    private readonly storageService: IAttachmentStorageService
  ) {}

  async execute(taskId: string, fileName: string): Promise<void> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new TaskNotFoundError(taskId);

    await this.storageService.delete(fileName);
    task.removeAttachment(fileName);
    await this.taskRepo.save(task);
  }
}
