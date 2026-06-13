import { AppRequest } from '@utils/types';
import { AppErrorMiddleware } from 'core/base/error-middleware.base';
import { Response, NextFunction } from 'express';

export class NotFoundHandlerMiddleware implements AppErrorMiddleware {
  public use(error: Error, req: AppRequest, res: Response, next: NextFunction): void | Promise<void> {
    if (!res.locals.data) {
      res.status(404).send({
        message: 'Not found',
        statusCode: 404,
      });

      return;
    }

    next();
  }
}
