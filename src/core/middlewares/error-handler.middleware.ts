import { AppErrorMiddleware } from '@core/base/error-middleware.base';
import { BadRequestException } from '@core/base/error.base';
import { AppRequest } from '@utils/types';
import { Response, NextFunction } from 'express';

export class ErrorHandlerMiddleware implements AppErrorMiddleware {
  public use(error: Error, _req: AppRequest, res: Response, _next: NextFunction): void {
    let message = 'Internal Error';
    let statusCode = 500;

    if (error instanceof BadRequestException) {
      message = error.message;
      statusCode = error.statusCode;
    }

    res.status(statusCode).send({
      message,
      statusCode,
    });
  }
}
