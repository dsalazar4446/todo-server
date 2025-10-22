import { ITaskRepository } from "../../../Task";
import { TaskNotFoundError } from "../../../Task/domain/error";
import { IAttachmentStorageService } from "../../application/services/IAttachmentStorageService";
import { Attachment } from "../../domain/Attachment";

export class UploadAttachment {
  constructor(
    private readonly taskRepo: ITaskRepository,
    private readonly storageService: IAttachmentStorageService
  ) {}

  async execute(
    taskId: string,
    file: Express.Multer.File
  ): Promise<Attachment> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new TaskNotFoundError(taskId);

    const { url, name } = await this.storageService.upload(file);

    const attachment = new Attachment(url, name, file.size, file.mimetype);

    task.addAttachment(attachment.toPrimitives());

    await this.taskRepo.save(task);
    return attachment;
  }
}
