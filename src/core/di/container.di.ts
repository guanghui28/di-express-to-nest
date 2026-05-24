/* eslint-disable @typescript-eslint/no-explicit-any */

type Constructor<T = any> = new (...args: any[]) => T;

export class Container {
  private readonly services: Map<string, Constructor<any>>;
  private readonly registered: Map<string, any>;

  public constructor() {
    this.services = new Map();
    this.registered = new Map();
  }

  public register(constructor: Constructor<any>) {
    this.services.set(constructor.name, constructor);
  }

  public get<T>(constructor: Constructor<T>): T {
    const service = this.services.get(constructor.name);

    if (!service) {
      throw new Error(`Service ${constructor.name} not found`);
    }

    if (this.registered.has(service.name)) {
      return this.registered.get(service.name);
    }

    const dependencies: Constructor<any>[] = Reflect.getMetadata('design:paramtypes', service) ?? [];

    console.log(`DEPS of ${service.name}: `, dependencies);

    const instanceOfDependencies = dependencies.map((dep) => {
      if (!this.services.has(dep.name)) {
        this.register(dep);
      }

      return this.get(dep);
    });

    const instance = new service(...instanceOfDependencies);
    this.registered.set(service.name, instance);

    return instance;
  }
}
