import { z } from "zod";

export const CreateTaskSchema = {
  body: z.object({
    title: z.string().min(3, "Title must have at least 3 characters"),
    description: z.string().optional(),
    userEmail: z.string().email(),
  }),
};

export const UpdateTaskSchema = {
  params: z.object({
    id: z.string().uuid("Invalid task id format"),
  }),
  body: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),
};

export const AddTagSchema = {
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ tag: z.string().min(1).max(30) }),
};

export const AddAttachmentSchema = {
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    url: z.url(),
    name: z.string().min(1),
  }),
};

export const DeleteAttachmentSchema = {
  params: z.object({
    id: z.uuid("Invalid task id (must be a UUID)"),
  }),
  body: z.object({
    fileName: z.string().min(1, "fileName is required"),
  }),
};
