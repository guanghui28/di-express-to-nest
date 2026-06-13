/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppMiddleware } from '@core/base/middleware.base';
import { AppRequest } from '@utils/types';
import { Response, NextFunction } from 'express';

export class ExecuteHandlerMiddleware implements AppMiddleware {
  public async use(req: AppRequest, res: Response, next: NextFunction): Promise<void> {
    const { context } = req;

    try {
      if (!context) {
        throw new Error('No route handler found for this request!');
      }

      const { instance, handlerName } = context;
      const result = await (instance as any)[handlerName](req, res, next);
      res.locals.data = result;
      next();
    } catch (error) {
      console.log('throw error: ', error);
      next(error);
    }
  }
}
