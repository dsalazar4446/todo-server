import { RouteDefinition } from "src/lib/Common/infrastructure/routes/RouteBuilder";
import {  CreateTaskSchema, UpdateTaskSchema } from "../schemas/TaskSchema";


export const TaskRouter: Array<RouteDefinition> = [
  {
    method: "post",
    path: "/",
    controller: "CreateTaskController",
    auth: true,
    validate: CreateTaskSchema,
  },
  {
    method: "get",
    path: "/",
    controller: "ListTasksByUserController",
    auth: true,
  },
  {
    method: "put",
    path: "/:id",
    controller: "UpdateTaskController",
    auth: true,
    validate: UpdateTaskSchema,
  },
  {
    method: "delete",
    path: "/:id",
    controller: "DeleteTaskController",
    auth: true,
  },

  {
    method: "patch",
    path: "/:id/toggle",
    controller: "ToggleTaskController",
    auth: true,
  },
  {
    method: "get",
    path: "/completed",
    controller: "ListCompletedTasksByUserController",
    auth: true,
  },
  {
    method: "get",
    path: "/pending",
    controller: "ListPendingTasksByUserController",
    auth: true,
  },
  {
    method: "get",
    path: "/search",
    controller: "SearchTasksController",
    auth: true,
  },
  {
    method: "post",
    path: "/:id/duplicate",
    controller: "DuplicateTaskController",
    auth: true,
  },
  {
    method: "post",
    path: "/archive/completed",
    controller: "ArchiveCompletedTasksController",
    auth: true,
  },
  {
    method: "delete",
    path: "/bulk/completed",
    controller: "BulkDeleteCompletedTasksController",
    auth: true,
  },
];
