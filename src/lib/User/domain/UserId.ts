import { randomUUID } from "crypto";

export class UserId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UserId): boolean {
    return this.value === other.getValue();
  }

  public toString(): string {
    return this.value;
  }
}
