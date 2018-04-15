
import { Request, Response, NextFunction } from 'express';
import { AppErrorInterface } from '../../utils/errors';
import { FormValidationError } from '../../utils/errors/customError';

export default class ErrorHandleMiddleware {
  public errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const error: AppErrorInterface = {
      name: err.name,
      status: err.status,
    };

    if (err instanceof FormValidationError) {
      error.fields = err.fields;
    } else {
      error.message = err.message;
    }

    if (error.status >= 100 && error.status < 600) {
      res.status(error.status);
    } else {
      res.status(500);
    }

    res.json({
      error,
    });
  }

  public logError(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    next(err);
  }
}
