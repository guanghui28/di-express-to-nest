/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { type Application } from 'express';
import { Container } from '@core/di/container.di';

type AppManagerOptions = {
  controllers?: Constructor<any>[];
};

export class AppManager {
  private readonly controllers: Constructor<any>[];
  private readonly app: Application;
  private readonly container: Container;

  public constructor({ controllers = [] }: AppManagerOptions) {
    this.controllers = controllers;
    this.app = express();
    this.container = new Container();
  }

  public init(): Application {
    this.registerDI();

    return this.app;
  }

  private registerDI(): void {
    this.controllers.map((controller) => this.container.register(controller));
  }
}
