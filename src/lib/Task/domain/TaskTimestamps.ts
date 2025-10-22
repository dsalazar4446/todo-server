export class TaskTimestamps {
  private readonly createdAt: Date;
  private readonly updatedAt: Date | undefined;

  constructor(createdAt?: Date | string, updatedAt?: Date | string) {
    this.createdAt = TaskTimestamps.parseDate(createdAt ?? new Date());
    this.updatedAt = updatedAt
      ? TaskTimestamps.parseDate(updatedAt)                            
      : new Date();
  }

  private static parseDate(value: Date | string): Date {
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) throw new Error(`Invalid date: ${value}`);
    return date;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  public touch(): TaskTimestamps {
    return new TaskTimestamps(this.createdAt, new Date());
  }

  public toPrimitives() {
    return {
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    };
  }
}
