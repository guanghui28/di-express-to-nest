import { AppRequest } from '@utils/types';
import { NextFunction, Response } from 'express';

export abstract class AppMiddleware {
  public abstract use(req: AppRequest, res: Response, next: NextFunction): void;
}
