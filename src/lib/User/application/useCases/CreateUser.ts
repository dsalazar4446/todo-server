import { User } from "../../domain";
import { UserAlreadyExistsError } from "../../domain/error";
import type { IUserRepository } from "../repositories/IUserRepository";

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new UserAlreadyExistsError(email);
    const user = User.create(email);
    await this.userRepository.save(user);
    return user;
  }
}
