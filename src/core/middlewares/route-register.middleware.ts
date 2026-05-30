/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppMiddleware } from '@core/base/middleware.base';
import { AppRequest } from '@utils/types';
import { NextFunction, Response } from 'express';

export class RouteRegisterMiddleware implements AppMiddleware {
  public constructor(
    private instance: Constructor<any>,
    private handlerName: string,
  ) {}

  public use(req: AppRequest, res: Response, next: NextFunction): void {
    const context = {
      instance: this.instance,
      handlerName: this.handlerName,
    };

    req.context = context;

    console.log({
      context,
    });

    next();
  }
}
