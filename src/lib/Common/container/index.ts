
import {
  AddTagToTask,
  ArchiveCompletedTasks,
  BulkDeleteCompletedTasks,
  CreateTask,
  DeleteTask,
  DuplicateTask,
  FirebaseTaskRepository,
  ITaskRepository,
  ListCompletedTasksByUser,
  ListPendingTasksByUser,
  ListTasksByDateRange,
  ListTasksByUser,
  RemoveTagFromTask,
  SearchTasks,
  ToggleTask,
  UpdateTask,
} from "../../Task";
import {
  AddTagToTaskController,
  RemoveTagFromTaskController,
  ArchiveCompletedTasksController,
  BulkDeleteCompletedTasksController,
  CreateTaskController,
  DuplicateTaskController,
  ListCompletedTasksByUserController,
  ListPendingTasksByUserController,
  ListTasksByUserController,
  SearchTasksController,
  ToggleTaskController,
  UpdateTaskController,
  DeleteTaskController,
} from "../../Task/infrastructure/controllers";

import { CreateUser, GetUserByEmail } from "../../User";
import type { IUserRepository } from "../../User/application/repositories/IUserRepository";
import { CreateUserController, GetUserByEmailController } from "../../User/infrastructure/controllers";
import { FirebaseUserRepository } from "../../User/infrastructure/FirebaseUserRepository";
import { AuthService } from "../infrastructure/auth/AuthService";
import { ServiceContainer } from "./ServiceContainer";

// Instancias concretas
const userRepository = new FirebaseUserRepository();
const taskRepository = new FirebaseTaskRepository();

// Registro de servicios
ServiceContainer.register<AuthService>("AuthService", new AuthService());

// Registro de repositorios
ServiceContainer.register<IUserRepository>("UserRepository", userRepository);
ServiceContainer.register<ITaskRepository>("TaskRepository", taskRepository);



// Registro de casos de uso user
ServiceContainer.register<CreateUser>("CreateUser",new CreateUser(userRepository));
ServiceContainer.register<GetUserByEmail>("GetUserByEmail",new GetUserByEmail(userRepository));
ServiceContainer.register("CreateUserController",new CreateUserController(ServiceContainer.resolve("CreateUser")));
ServiceContainer.register("GetUserByEmailController",new GetUserByEmailController(ServiceContainer.resolve("GetUserByEmail")));


ServiceContainer.register<CreateTask>("CreateTask",new CreateTask(taskRepository));
ServiceContainer.register<ToggleTask>("ToggleTask",new ToggleTask(taskRepository));
ServiceContainer.register<UpdateTask>("UpdateTask",new UpdateTask(taskRepository));
ServiceContainer.register<DeleteTask>("DeleteTask",new DeleteTask(taskRepository));
ServiceContainer.register<ListTasksByUser>("ListTasksByUser",new ListTasksByUser(taskRepository));
ServiceContainer.register("ListCompletedTasksByUser",new ListCompletedTasksByUser(taskRepository));
ServiceContainer.register("ListPendingTasksByUser",new ListPendingTasksByUser(taskRepository));
ServiceContainer.register("SearchTasks", new SearchTasks(taskRepository));
ServiceContainer.register("ListTasksByDateRange",new ListTasksByDateRange(taskRepository));
ServiceContainer.register("DuplicateTask", new DuplicateTask(taskRepository));
ServiceContainer.register("ArchiveCompletedTasks",new ArchiveCompletedTasks(taskRepository));
ServiceContainer.register("BulkDeleteCompletedTasks",new BulkDeleteCompletedTasks(taskRepository));

// Tasks
ServiceContainer.register("CreateTaskController",new CreateTaskController(ServiceContainer.resolve("CreateTask")));
ServiceContainer.register("UpdateTaskController",new UpdateTaskController(ServiceContainer.resolve("UpdateTask")));
ServiceContainer.register("DeleteTaskController",new DeleteTaskController(ServiceContainer.resolve("DeleteTask")));
ServiceContainer.register("ToggleTaskController",new ToggleTaskController(ServiceContainer.resolve("ToggleTask")));

ServiceContainer.register("ListTasksByUserController",new ListTasksByUserController(ServiceContainer.resolve("ListTasksByUser")));
ServiceContainer.register("ListCompletedTasksByUserController",new ListCompletedTasksByUserController(ServiceContainer.resolve("ListCompletedTasksByUser")));
ServiceContainer.register("ListPendingTasksByUserController",new ListPendingTasksByUserController(ServiceContainer.resolve("ListPendingTasksByUser")));
ServiceContainer.register("SearchTasksController",new SearchTasksController(ServiceContainer.resolve("SearchTasks")));
ServiceContainer.register("DuplicateTaskController",new DuplicateTaskController(ServiceContainer.resolve("DuplicateTask")));
ServiceContainer.register("ArchiveCompletedTasksController",new ArchiveCompletedTasksController(ServiceContainer.resolve("ArchiveCompletedTasks")));
ServiceContainer.register("BulkDeleteCompletedTasksController",new BulkDeleteCompletedTasksController(ServiceContainer.resolve("BulkDeleteCompletedTasks")));

ServiceContainer.register("AddTagToTask", new AddTagToTask(taskRepository));
ServiceContainer.register("RemoveTagFromTask",new RemoveTagFromTask(taskRepository));

ServiceContainer.register("AddTagToTaskController",new AddTagToTaskController(ServiceContainer.resolve("AddTagToTask")));
ServiceContainer.register("RemoveTagFromTaskController",new RemoveTagFromTaskController(ServiceContainer.resolve("RemoveTagFromTask")));

 

export { ServiceContainer };
