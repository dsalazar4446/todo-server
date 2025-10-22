import { Router, Request, Response, RequestHandler, NextFunction } from "express";
import { ServiceContainer } from "../../container";
import { validateRequest } from "../validation/validateRequest";
import { AuthMiddleware } from "../auth/AuthMiddleware";

type Verb = "get" | "post" | "put" | "patch" | "delete";

export interface RouteDefinition {
  method: Verb;
  path: string;
  controller: string;
  auth?: boolean | Array<RequestHandler>;
  validate?: any;
  middleware?: Array<RequestHandler>;
}

export class RouteBuilder {
  protected router: Router;

  constructor(private readonly container = ServiceContainer) {
    this.router = Router();
  }

  public register(routes: RouteDefinition[], basePath = ""): RouteBuilder {
    routes.forEach((route) => {
      const method = route.method.toLowerCase() as Verb

      const fullPath = `${basePath}${route.path}`;
      const controllerInstance = this.container.resolve<any>(route.controller);

      const handlers: RequestHandler[] = [];
      
      // autenticación
      if (route.auth) {
        if (Array.isArray(route.auth)) {
          handlers.push(...route.auth);
        } else if (route.auth === true) {
          handlers.push(AuthMiddleware);
        } else {
          handlers.push(route.auth);
        }
      }

      // validación
      if (route.validate) {
        handlers.push(validateRequest(route.validate));
      }

      // middlewares adicionales
      if (route.middleware && route.middleware.length > 0) {
        handlers.push(...route.middleware);
      }

      // controlador final
      handlers.push((req: Request, res: Response, next: NextFunction) => controllerInstance.execute(req, res, next));

      // registro de la ruta
      this.router[method](fullPath, ...handlers);
    });

    return this;
  }
  public build(): Router {
    return this.router;
  }
}