import { AppRequest } from '@utils/types';
import { NextFunction, Response } from 'express';

export interface AppMiddleware {
  use(req: AppRequest, res: Response, next: NextFunction): void;
}
