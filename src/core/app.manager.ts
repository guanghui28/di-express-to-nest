/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { type Application } from 'express';
import { Container } from '@core/di/container.di';
import { ExecuteHandlerMiddleware } from '@core/middlewares/execute-handler.middleware';
import { ErrorHandlerMiddleware } from '@core/middlewares/error-handler.middleware';
import { ResponseFormatter } from './middlewares/response-formatter.middleware';
import { NotFoundHandlerMiddleware } from './middlewares/404-handler.middleware';
import { routeRegister } from './routes/route-register.route';
import { AppMiddleware } from './base/middleware.base';
import { AppErrorMiddleware } from './base/error-middleware.base';

type UnknownMiddleware = (...args: any[]) => void;
type UsableConstructor = Constructor<AppMiddleware | AppErrorMiddleware>;

type UsableType = UsableConstructor | UnknownMiddleware;

function isMiddlewareClass(middleware: UsableType): middleware is UsableConstructor {
  return typeof middleware === 'function' && typeof middleware.prototype?.use === 'function';
}

type AppManagerOptions = {
  controllers?: Constructor[];
  middlewares?: UsableType[];
  interceptors?: UsableType[];
};

export class AppManager {
  private readonly controllers: Constructor<any>[];
  private readonly app: Application;
  private readonly container: Container;
  private instances!: Constructor<any>[];
  private readonly middlewares: UsableType[];
  private readonly interceptors: UsableType[];

  public constructor({ controllers = [], middlewares = [], interceptors = [] }: AppManagerOptions) {
    this.controllers = controllers;
    this.middlewares = middlewares;
    this.interceptors = interceptors;
    this.app = express();
    this.container = new Container();
  }

  public init(): Application {
    this.registerDI();
    this.applyMiddlewares(this.middlewares, 'middlewares');
    this.registerRoutes();
    this.applyMiddlewares([ExecuteHandlerMiddleware], 'guards');
    this.applyMiddlewares(this.interceptors, 'interceptor');
    this.applyMiddlewares([ResponseFormatter], 'formatter');
    this.applyMiddlewares([NotFoundHandlerMiddleware], 'not found');
    this.applyMiddlewares([ErrorHandlerMiddleware], 'errorhandling');

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
      const router = routeRegister(instance);
      this.app.use(router);
    });
  }

  private applyMiddlewares(middlewares: UsableType[], debugName?: string): void {
    if (DEBUG && debugName) {
      console.log(`========== ${debugName.toUpperCase()} ==========`);
    }

    if (middlewares.length === 0) return;

    middlewares.forEach((middleware) => {
      if (isMiddlewareClass(middleware)) {
        new middleware();

        this.container.register(middleware);
        const instance = this.container.get(middleware);

        this.app.use(instance.use.bind(instance));
      } else {
        this.app.use(middleware);
      }
    });
  }
}
