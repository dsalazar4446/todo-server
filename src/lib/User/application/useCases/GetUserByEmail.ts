import { UserNotFoundError } from "../../domain/error";
import { User } from "../../domain/User";
import type { IUserRepository } from "../repositories/IUserRepository";


export class GetUserByEmail {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError(email);
    }
    return this.userRepository.findByEmail(email);
  }
}
