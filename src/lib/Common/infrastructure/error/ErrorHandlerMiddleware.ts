import { Request, NextFunction, Response } from "express";
import { BaseError } from "./BaseError";
import { Logger } from "../logger/logger";

export async function ErrorHandlerMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Captura de errores controlados (derivados de BaseError)
  if (err instanceof BaseError) {
    Logger.warn(`[Handled Error] ${err.name}`, err.toJSON());

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        code: err.name,
        details: err.stack || null,
      },
    });
  }

  // Captura de errores no controlados
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === "production";

  Logger.error(`[Unhandled Error] ${err?.message || "Unknown error"}`, {
    name: err?.name,
    stack: err?.stack,
  });

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Unexpected Error",
    error: {
      code: err.code || "INTERNAL_ERROR",
      details: isProd ? undefined : err.stack || "Internal Error",
    },
  });
}
