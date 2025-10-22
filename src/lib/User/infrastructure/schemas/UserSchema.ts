import { z } from "zod";

export const CreateUserSchema = {
  body: z.object({
    email: z.email(),
  }),
};

export const GetUserByEmailSchema = {
  params: z.object({
    email: z.email(),
  }),
};
