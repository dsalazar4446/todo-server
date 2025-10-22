import type { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

/**
 * Middleware genérico para validar body, query o params con Zod.
 */
export function validateRequest(schemas: {
  body?: ZodObject;
  query?: ZodObject;
  params?: ZodObject;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) schemas.body.parse(req.body);
      if (schemas.query) schemas.query.parse(req.query);
      if (schemas.params) schemas.params.parse(req.params);
      next();
    } catch (error: any) {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors ?? error.message,
      });
    }
  };
}
