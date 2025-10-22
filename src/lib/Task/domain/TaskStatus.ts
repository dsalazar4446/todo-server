export enum TaskStatusType {
  Pending = "PENDING",
  Completed = "COMPLETED",
}

export class TaskStatus {
  private readonly value: TaskStatusType;

  constructor(value?: TaskStatusType) {
    this.value = value ?? TaskStatusType.Pending;
  }

  public static fromBoolean(done: boolean): TaskStatus {
    return new TaskStatus(
      done ? TaskStatusType.Completed : TaskStatusType.Pending
    );
  }

  public isCompleted(): boolean {
    return this.value === TaskStatusType.Completed;
  }

  public toggle(): TaskStatus {
    return this.isCompleted()
      ? new TaskStatus(TaskStatusType.Pending)
      : new TaskStatus(TaskStatusType.Completed);
  }

  public getValue(): TaskStatusType {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
