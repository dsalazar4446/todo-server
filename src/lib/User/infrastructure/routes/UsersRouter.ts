import { RouteDefinition } from "src/lib/Common/infrastructure/routes/RouteBuilder";
import { CreateUserSchema, GetUserByEmailSchema } from "../schemas/UserSchema";

export const UsersRouter: Array<RouteDefinition> = [
  {
    method: "post",
    path: "/",
    controller: "CreateUserController",
    validate: CreateUserSchema,
  },
  {
    method: "get",
    path: "/:email",
    controller: "GetUserByEmailController",
    validate: GetUserByEmailSchema,
  },
];