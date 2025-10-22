export class TaskDescription {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value?.trim() ?? "";
  }

  public getValue(): string {
    return this.value;
  }

  public isEmpty(): boolean {
    return this.value.length === 0;
  }

  public toString(): string {
    return this.value;
  }
}
