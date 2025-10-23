# 🧠 Challenge Técnico - Backend

## 📋 Descripción

Este backend implementa una **API REST** basada en **Node.js + Express**, utilizando **Firebase Firestore** como base de datos. El sistema fue diseñado conforme a los lineamientos del challenge técnico y sigue una arquitectura modular, priorizando separación de responsabilidades, mantenibilidad y claridad.

---

## 🧩 Características principales

* CRUD completo para **Usuarios** y **Tareas**
* Soporte de **JWT Authentication**
* Middleware global de **Errores**, **Logging** y **Validación**
* Endpoint de **Health Check**
* Scripts de despliegue y entorno preconfigurados para **Firebase Functions v2**

---

## ⚙️ Estructura del proyecto

```
└── 📁src
    └── 📁lib
        └── 📁Common
            └── 📁container
                ├── index.ts
                ├── ServiceContainer.ts
            └── 📁domain
                ├── entity.ts
            └── 📁infrastructure
                └── 📁auth
                    ├── AuthMiddleware.ts
                    ├── AuthService.ts
                └── 📁config
                    ├── config.ts
                └── 📁controllers
                    ├── BaseController.ts
                    ├── index.ts
                └── 📁error
                    ├── ApplicationError.ts
                    ├── BaseError.ts
                    ├── DomainError.ts
                    ├── ErrorHandlerMiddleware.ts
                    ├── index.ts
                    ├── InfrastructureError.ts
                    ├── UnauthorizedError.ts
                └── 📁firebase
                    ├── config.ts
                    ├── firebaseApp.ts
                └── 📁http
                    ├── HttpResponse.ts
                └── 📁logger
                    ├── logger.ts
                └── 📁routes
                    ├── RouteBuilder.ts
                └── 📁server
                    ├── server.ts
                └── 📁validation
                    ├── validateRequest.ts
                ├── .DS_Store
        └── 📁Task
            └── 📁application
                └── 📁repositories
                    ├── ITaskRepository.ts
                └── 📁useCases
                    ├── AddAttachmentToTask.ts
                    ├── AddTagToTask.ts
                    ├── ArchiveCompletedTasks.ts
                    ├── BulkDeleteCompletedTasks.ts
                    ├── CreateTask.ts
                    ├── DeleteTask.ts
                    ├── DuplicateTask.ts
                    ├── ListCompletedTasksByUser.ts
                    ├── ListPendingTasksByUser.ts
                    ├── ListTasksByDateRange.ts
                    ├── ListTasksByUser.ts
                    ├── RemoveAttachmentFromTask.ts
                    ├── RemoveTagFromTask.ts
                    ├── SearchTasks.ts
                    ├── ToggleTask.ts
                    ├── UpdateTask.ts
                ├── index.ts
            └── 📁domain
                └── 📁error
                    ├── index.ts
                    ├── InvalidAttachmentError.ts
                    ├── InvalidTaskStatusError.ts
                    ├── TagAlreadyExistsError.ts
                    ├── TaskNotFoundError.ts
                ├── index.ts
                ├── Task.ts
                ├── TaskAttachment.ts
                ├── TaskDescription.ts
                ├── TaskId.ts
                ├── TaskStatus.ts
                ├── TaskTag.ts
                ├── TaskTimestamps.ts
                ├── TaskTitle.ts
            └── 📁infrastructure
                └── 📁controllers
                    ├── AddAttachmentToTaskController.ts
                    ├── AddTagToTaskController.ts
                    ├── ArchiveCompletedTasksController.ts
                    ├── BulkDeleteCompletedTasksController.ts
                    ├── CreateTaskController.ts
                    ├── DeleteTaskController.ts
                    ├── DuplicateTaskController.ts
                    ├── index.ts
                    ├── ListCompletedTasksByUserController.ts
                    ├── ListPendingTasksByUserController.ts
                    ├── ListTasksByUserController.ts
                    ├── RemoveAttachmentFromTaskController.ts
                    ├── RemoveTagFromTaskController.ts
                    ├── SearchTasksController.ts
                    ├── ToggleTaskController.ts
                    ├── UpdateTaskController.ts
                └── 📁routes
                    ├── TaskRouter.ts
                └── 📁schemas
                    ├── TaskSchema.ts
                ├── FirebaseTaskRepository.ts
            ├── index.ts
        └── 📁User
            └── 📁application
                └── 📁repositories
                    ├── IUserRepository.ts
                └── 📁useCases
                    ├── CreateUser.ts
                    ├── GetUserByEmail.ts
                    ├── index.ts
                ├── index.ts
            └── 📁domain
                └── 📁error
                    ├── index.ts
                    ├── InvalidUserEmailError.ts
                    ├── UserAlreadyExistsError.ts
                    ├── UserNotFoundError.ts
                ├── index.ts
                ├── User.ts
                ├── UserCreateAt.ts
                ├── UserEmail.ts
                ├── UserId.ts
            └── 📁infrastructure
                └── 📁controllers
                    ├── CreateUserController.ts
                    ├── GetUserByEmailController.ts
                    ├── index.ts
                └── 📁error
                    ├── DatabaseError.ts
                └── 📁routes
                    ├── UsersRouter.ts
                └── 📁schemas
                    ├── UserSchema.ts
                ├── .DS_Store
                ├── FirebaseUserRepository.ts
            ├── index.ts
    └── main.ts
```

---

## 🚀 Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/dsalazar4446/todo-server.git
cd todo-server
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

Ejemplo:

```
PORT=4000
PROJECT_ID=task-manager-XXXX
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXX\n-----END PRIVATE KEY-----\n"
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
PREFIX=/API
NODE_ENV=development
```

### 4. Ejecutar servidor local

```bash
npm run dev
```

Servidor disponible en `http://localhost:4000`

---

## 🔑 Autenticación (JWT)

El sistema usa **JWT** para autenticar usuarios. El endpoint `/auth/login` genera un token y el middleware `AuthMiddleware` protege las rutas privadas.

---

## 🧱 Endpoints principales

Según los requerimientos oficiales del challenge, los endpoints implementados son los siguientes【33:1†Challenge_Te_cnico_-_Fullstack.pdf†L8-L30】:

### 🔸 Usuarios

| Método | Ruta            | Descripción            |
| ------ | --------------- | ---------------------- |
| `POST` | `/users`        | Crear un nuevo usuario |
| `GET`  | `/users/:`email | Obtener usuario por ID |
|        |                 |                        |

### 🔸 Tareas

| Método   | Ruta         | Descripción                                                    |
| -------- | ------------ | -------------------------------------------------------------- |
| `GET`    | `/tasks`     | Obtener lista de tareas del usuario (pendientes y completadas) |
| `POST`   | `/tasks`     | Agregar una nueva tarea                                        |
| `PATCH`  | `/tasks/:id/toggle` | Actualizar el status de una tarea existente             |
| `PUT`  | `/tasks/:id` | Actualizar los datos de una tarea existente                      |
| `DELETE` | `/tasks/:id` | Eliminar una tarea existente                                   |


### 🔸 Health Check

| Método | Ruta      | Descripción                                                   |
| ------ | --------- | ------------------------------------------------------------- |
| `GET`  | `/health` | Verifica el estado general del servidor y conexión a Firebase |

---

## 🧰 Scripts útiles

```bash
npm run dev       # Ejecuta en modo desarrollo (ts-node-dev)
npm run build     # Compila TypeScript a JavaScript
npm start         # Inicia el servidor compilado
```

---

##

---

## ☁️ Despliegue (Firebase Functions v2)

```bash
firebase deploy --only functions:api
```

Asegúrate de que el archivo `firebase.json` incluya la función `api` apuntando a `src/index.ts`.

---

## 🧾 Licencia

MIT © 2025 Daniel Salazar
