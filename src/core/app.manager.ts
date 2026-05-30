/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from 'express';
import { type Application } from 'express';
import { Container } from '@core/di/container.di';
import { getMetadata } from '@core/metadata/metadata';
import { METADATA_KEY } from '@utils/constants';
import { combinePaths } from '@utils/common';
import { RouteRegisterMiddleware } from '@core/middlewares/route-register.middleware';
import { ControllerDecoratorMetadata, MethodDecoratorMetadata } from '@utils/types';
import { ExecuteHandlerMiddleware } from '@core/middlewares/execute-handler.middleware';

type AppManagerOptions = {
  controllers?: Constructor<any>[];
  middlewares?: any[];
};

export class AppManager {
  private readonly controllers: Constructor<any>[];
  private readonly app: Application;
  private readonly container: Container;
  private instances!: Constructor<any>[];
  private readonly middlewares: any[];

  public constructor({ controllers = [], middlewares = [] }: AppManagerOptions) {
    this.controllers = controllers;
    this.middlewares = middlewares;
    this.app = express();
    this.container = new Container();
  }

  public init(): Application {
    this.registerDI();
    this.applyMiddlewares(...this.middlewares);
    this.registerRoutes();
    this.applyMiddlewares(ExecuteHandlerMiddleware);
    return this.app;
  }

  private registerDI(): void {
    this.instances = this.controllers.map((controller) => {
      this.container.register(controller);
      return this.container.get(controller);
    });
  }

  private registerRoutes(): void {
    this.instances.forEach((instance) => {
      const router = this.createRouter(instance);
      this.app.use(router);
    });
  }

  private createRouter(instance: Constructor<any>): Router {
    const router = Router();

    const { path: basePath } = getMetadata<ControllerDecoratorMetadata>(METADATA_KEY.CONTROLLER, instance.constructor);

    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter(
      (method) => method !== 'constructor',
    );

    methods.forEach((method) => {
      const { httpMethod, path } = getMetadata<MethodDecoratorMetadata>(METADATA_KEY.METHOD, (instance as any)[method]);

      const fullPath = combinePaths(basePath, path);

      console.log({
        httpMethod,
        fullPath,
      });

      const routeMiddleware = new RouteRegisterMiddleware(instance, method);

      (router as any)[httpMethod](fullPath, routeMiddleware.use.bind(routeMiddleware));
    });

    return router;
  }

  private applyMiddlewares(...middlewares: any[]): void {
    if (middlewares.length === 0) return;

    middlewares.forEach((middleware) => {
      try {
        new middleware();

        this.container.register(middleware);
        const instance = this.container.get(middleware);

        this.app.use((instance as any).use.bind(instance));
      } catch {
        this.app.use(middleware);
      }
    });
  }
}
