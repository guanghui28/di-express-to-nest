import { getMetadata } from '@core/metadata/metadata';
import { RouteRegisterMiddleware } from '@core/middlewares/route-register.middleware';
import { combinePaths } from '@utils/common';
import { METADATA_KEY } from '@utils/constants';
import { ControllerDecoratorMetadata, MethodDecoratorMetadata } from '@utils/types';
import { Router } from 'express';

export const routeRegister = (instance: InstanceType<Constructor>): Router => {
  const router = Router();

  const { path: basePath } = getMetadata<ControllerDecoratorMetadata>(METADATA_KEY.CONTROLLER, instance.constructor);

  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter(
    (method) => method !== 'constructor',
  );

  methods.forEach((method) => {
    const { httpMethod, path } = getMetadata<MethodDecoratorMetadata>(METADATA_KEY.METHOD, instance[method]);

    const fullPath = combinePaths(basePath, path);

    if (DEBUG) {
      console.log({
        httpMethod,
        fullPath,
      });
    }

    const routeMiddleware = new RouteRegisterMiddleware(instance, method);

    router[httpMethod](fullPath, routeMiddleware.use.bind(routeMiddleware));
  });

  return router;
};
