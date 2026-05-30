import { AppRequest } from '@utils/types';
import { NextFunction, Response } from 'express';

export abstract class AppErrorMiddleware {
  public abstract use(error: Error, req: AppRequest, res: Response, next: NextFunction): void | Promise<void>;
}
