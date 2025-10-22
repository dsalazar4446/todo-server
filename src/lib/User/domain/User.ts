import { UserCreatedAt } from "./UserCreateAt";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";


export class User {
  private readonly id: UserId;
  private readonly email: UserEmail;
  private readonly createdAt: UserCreatedAt;

  private constructor(props: {
    id: UserId;
    email: UserEmail;
    createdAt: UserCreatedAt;
  }) {
    this.id = props.id;
    this.email = props.email;
    this.createdAt = props.createdAt;
  }

  /** Factory method para instanciar un nuevo usuario */
  public static create(
    email: string,
    id?: string,
    createdAt?: Date | string
  ): User {
    return new User({
      id: new UserId(id),
      email: new UserEmail(email),
      createdAt: new UserCreatedAt(createdAt),
    });
  }

  public getId(): UserId {
    return this.id;
  }

  public getEmail(): UserEmail {
    return this.email;
  }

  public getCreatedAt(): UserCreatedAt {
    return this.createdAt;
  }

  /** Conversión para persistencia o respuesta JSON */
  public toPrimitives() {
    return {
      id: this.id.getValue(),
      email: this.email.getValue(),
      createdAt: this.createdAt.toISOString(),
    };
  }
}
