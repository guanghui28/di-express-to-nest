/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppMiddleware } from '@core/base/middleware.base';
import { AppRequest } from '@utils/types';
import { Response, NextFunction } from 'express';

export class ExecuteHandlerMiddleware implements AppMiddleware {
  public async use(req: AppRequest, res: Response, next: NextFunction): Promise<void> {
    const { context } = req;

    if (!context) {
      throw new Error();
    }

    const { instance, handlerName } = context;

    try {
      const result = await (instance as any)[handlerName](req, res, next);

      res.send(result);
    } catch (error) {
      console.log('Error from somewhere', error);

      next();
    }
  }
}
