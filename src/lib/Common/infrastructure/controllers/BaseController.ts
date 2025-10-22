import type { NextFunction, Request, Response } from "express";
import { BaseError } from "../error";

export abstract class BaseController {
  protected abstract executeImpl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any>;

  public async execute(req: Request, res: Response,next: NextFunction): Promise<void> {
    try {
      await this.executeImpl(req, res, next);
    } catch (error: any) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).json(error.toJSON());
      } else {

          next(error);
      }
    }
  }
}
