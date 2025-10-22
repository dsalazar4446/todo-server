import { UserEmail } from "../../User/domain";
import { InvalidAttachmentError, InvalidTaskStatusError } from "./error";
import { TagAlreadyExistsError } from "./error/TagAlreadyExistsError";
import { TaskAttachment } from "./TaskAttachment";
import { TaskDescription } from "./TaskDescription";
import { TaskId } from "./TaskId";
import { TaskStatus, TaskStatusType } from "./TaskStatus";
import { TaskTag } from "./TaskTag";
import { TaskTimestamps } from "./TaskTimestamps";
import { TaskTitle } from "./TaskTitle";

export class Task {
  private readonly id: TaskId;
  private title: TaskTitle;
  private description: TaskDescription;
  private readonly userEmail: UserEmail;
  private status: TaskStatus;
  private timestamps: TaskTimestamps;
  private tags: TaskTag[] = [];
  private attachments: TaskAttachment[] = [];

  private constructor(props: {
    id: TaskId;
    title: TaskTitle;
    description: TaskDescription;
    userEmail: UserEmail;
    status: TaskStatus;
    timestamps: TaskTimestamps;
    tags?: TaskTag[];
    attachments?: TaskAttachment[];
  }) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.userEmail = props.userEmail;
    this.status = props.status;
    this.timestamps = props.timestamps;
    this.tags = props.tags ?? [];
    this.attachments = props.attachments ?? [];
  }

  /** Factory principal para crear una nueva tarea */
  public static create(params: {
    title: string;
    description?: string;
    userEmail: string;
  }): Task {
    return new Task({
      id: new TaskId(),
      title: new TaskTitle(params.title),
      description: new TaskDescription(params.description),
      userEmail: new UserEmail(params.userEmail),
      status: new TaskStatus(TaskStatusType.Pending),
      timestamps: new TaskTimestamps(),
    });
  }

  toggleStatus(): void {
    try {
      this.status = this.status.toggle();
    } catch (err: any) {
      throw new InvalidTaskStatusError(this.status.getValue());
    }
  }

  public complete(): void {
    if (this.status.isCompleted()) return;
    this.status = new TaskStatus(TaskStatusType.Completed);
    this.timestamps = this.timestamps.touch();
  }

  public reopen(): void {
    if (!this.status.isCompleted()) return;
    this.status = new TaskStatus(TaskStatusType.Pending);
    this.timestamps = this.timestamps.touch();
  }

  public updateTitle(newTitle: string): void {
    this.title = new TaskTitle(newTitle);
    this.timestamps = this.timestamps.touch();
  }

  public updateDescription(newDescription: string): void {
    this.description = new TaskDescription(newDescription);
    this.timestamps = this.timestamps.touch();
  }
  addTag(tag: string): void {
    const tagObj = new TaskTag(tag);
    if (this.tags.find((t) => t.equals(tagObj)))
      throw new TagAlreadyExistsError(tag);
    this.tags.push(tagObj);
    this.timestamps = this.timestamps.touch();
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t.getValue() !== tag.toLowerCase());
    this.timestamps = this.timestamps.touch();
  }

  addAttachment(data: { url: string; name: string }): void {
    try {
      const attachment = new TaskAttachment(data);
      this.attachments.push(attachment);
    } catch (err: any) {
      throw new InvalidAttachmentError(err.message);
    }
  }

  removeAttachment(name: string): void {
    const index = this.attachments.findIndex((a) => a.getName() === name);
    if (index === -1)
      throw new InvalidAttachmentError(`Attachment '${name}' not found`);
    this.attachments.splice(index, 1);
  }

  // ---- Getters ----

  public getId(): TaskId {
    return this.id;
  }

  public getTitle(): TaskTitle {
    return this.title;
  }

  public getDescription(): TaskDescription {
    return this.description;
  }

  public getUserEmail(): UserEmail {
    return this.userEmail;
  }

  public getStatus(): TaskStatus {
    return this.status;
  }

  public getTimestamps(): TaskTimestamps {
    return this.timestamps;
  }

  // ---- Serialización ----

  toPrimitives() {
    return {
      id: this.id.getValue(),
      title: this.title.getValue(),
      description: this.description.getValue(),
      userEmail: this.userEmail.getValue(),
      completed: this.status.isCompleted(),
      tags: TaskTag.toPrimitives(this.tags),
      attachments: TaskAttachment.toPrimitives(this.attachments),
      ...this.timestamps.toPrimitives(),
    };
  }

  /** Factory para reconstruir desde la persistencia */
  public static fromPrimitives(data: any): Task {
    return new Task({
      id: new TaskId(data.id),
      title: new TaskTitle(data.title),
      description: new TaskDescription(data.description),
      userEmail: new UserEmail(data.userEmail),
      status: new TaskStatus(
        data.completed ? TaskStatusType.Completed : TaskStatusType.Pending
      ),
      timestamps: new TaskTimestamps(data.createdAt, data.updatedAt),
    });
  }
}
