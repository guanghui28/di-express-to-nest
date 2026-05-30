/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  type Constructor<T = any> = new (...args: any[]) => T;
}

export {};
