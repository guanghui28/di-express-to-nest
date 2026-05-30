/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';

export interface AppRequest extends Request {
  context?: {
    instance: Constructor<any>;
    methodName: string;
  };
}

export type ControllerDecoratorMetadata = {
  path: string;
};

export type MethodDecoratorMetadata = {
  httpMethod: HttpMethodName;
  path: string;
};
