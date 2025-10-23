import express, { Response ,Request} from "express";
import cors from "cors";
import { json, urlencoded } from "express";
import { config } from "../config/config";
import { RouteBuilder } from "../routes/RouteBuilder";
import { ServiceContainer } from "../../container";
import { UsersRouter } from "../../../User/infrastructure/routes/UsersRouter";
import { TaskRouter } from "../../../Task/infrastructure/routes/TaskRouter";
import { ErrorHandlerMiddleware } from "../error";
import { Logger } from "../logger/logger";
import { checkFirebaseStatus } from "../firebase/firebaseApp";
import * as functions from "firebase-functions";

export class Server {
  public app = express();

  constructor() {
    this.initializeFirebase();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  private initializeFirebase() {
    
    const { firebaseKeyPath } = config.firebase;
    if (!firebaseKeyPath && !config.production) {
      throw new Error("FIREBASE_KEY_PATH is not defined in .env");
    }
    if (!config.production) {
      Logger.info("[Firebase Status]", checkFirebaseStatus());
    }

    Logger.info("✅ Firebase initialized");
  }

  private setupMiddlewares() {
    this.app.use(cors());
    this.app.use(json({ limit: "10mb" }));
    this.app.use(urlencoded({ extended: false }));
  }

  private setupRoutes() {
    const router = new RouteBuilder(ServiceContainer)
      .register(UsersRouter, "/users")
      .register(TaskRouter, "/tasks")
      .build();
    
    const {prefix} = config;
    this.app.use(prefix, router);

    this.app.get(`${prefix}/health`, async (_: Request, res: Response) => {
      const status = { ...checkFirebaseStatus() };
      console.log("[Firebase Status]", status);

      res.json({ status });
    });

    this.app.get(prefix, (_:Request, res:Response) => {
      res.send("🚀 API is running");
    });
  }

  private setupErrorHandler() {
    this.app.use(ErrorHandlerMiddleware);
  }

  
  public init() {
    if (config.production) {
      return functions.https.onRequest(this.app);
    } else {
      return this.app
    }

  }
}
