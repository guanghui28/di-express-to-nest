import { HTTP_METHODS } from '@utils/constants';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  type Constructor<T = any> = new (...args: any[]) => T;

  var DEBUG: boolean;

  export type HttpMethodName = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];
}

export {};
