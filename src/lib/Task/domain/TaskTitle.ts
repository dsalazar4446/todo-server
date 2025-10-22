export class TaskTitle {
  private readonly value: string;

  constructor(value: string) {
    if (!value || !value.trim()) {
      throw new Error("Task title cannot be empty");
    }
    if (value.length > 100) {
      throw new Error("Task title exceeds 100 characters");
    }
    this.value = value.trim();
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }
}
