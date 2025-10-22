import { InvalidUserEmailError } from "./error";

export class UserEmail {
  private readonly value: string;

  constructor(value: string) {
      if (!UserEmail.isValid(value)) throw new InvalidUserEmailError(value);

    this.value = value.toLowerCase();
  }

  private static isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UserEmail): boolean {
    return this.value === other.getValue();
  }

  public toString(): string {
    return this.value;
  }
}
