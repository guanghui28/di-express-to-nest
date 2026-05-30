/* eslint-disable @typescript-eslint/no-explicit-any */
export const setMetadata = (
  key: string | symbol,
  value: any,
): ClassDecorator | MethodDecorator | ParameterDecorator => {
  return (target: any, propertyKey?: string | symbol, descriptorOrParamIndex?: PropertyDescriptor | number) => {
    // For Parameter Decorator in method
    if (propertyKey && typeof descriptorOrParamIndex === 'number') {
      const paramIndex = descriptorOrParamIndex;

      if (!target[propertyKey].paramMetadata) {
        target[propertyKey].paramMetadata = [];
      }

      target[propertyKey].paramMetadata[paramIndex] = {
        key,
        value,
      };

      return;
    }

    // For Parameter Decorator in constructor
    if (!propertyKey && typeof descriptorOrParamIndex === 'number') {
      const paramIndex = descriptorOrParamIndex;

      if (!target.paramMetadata) {
        target.paramMetadata = [];
      }

      target.paramMetadata[paramIndex] = {
        key,
        value,
      };

      return;
    }

    // For Method Decorator not for static method
    if (propertyKey) {
      const descriptor = descriptorOrParamIndex as PropertyDescriptor;

      if (!descriptor.value.metadata) {
        descriptor.value.metadata = {};
      }

      descriptor.value.metadata[key] = value;
      return;
    }

    // For Class Decorator
    target.metadata = target.metadata || {};
    target.metadata[key] = value;
  };
};

export const getMetadata = <T = unknown>(propertyKey: string | symbol, target: any): T => {
  return target.metadata[propertyKey];
};

export const getAllMetadata = (target: any): any => {
  return target.metadata;
};
