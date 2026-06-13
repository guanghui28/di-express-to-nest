import { AppMiddleware } from '@core/base/middleware.base';
import { AppRequest } from '@utils/types';
import { Response, NextFunction } from 'express';

export class ResponseFormatter implements AppMiddleware {
  public use(req: AppRequest, res: Response, next: NextFunction): void {
    if (!res.locals.data) {
      next();

      return;
    }

    res.send({
      message: 'OK',
      statusCode: res.statusCode,
      data: res.locals.data,
    });
  }
}
