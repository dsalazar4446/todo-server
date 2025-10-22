import { randomUUID } from "crypto";

export class TaskId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: TaskId): boolean {
    return this.value === other.getValue();
  }

  public toString(): string {
    return this.value;
  }
}
