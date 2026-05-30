import { setMetadata } from '@core/metadata/metadata';
import { HTTP_METHODS, METADATA_KEY } from '@utils/constants';

export const Get = (path: string) =>
  setMetadata(METADATA_KEY.METHOD, {
    httpMethod: HTTP_METHODS.GET,
    path,
  }) as MethodDecorator;

export const Post = (path: string) =>
  setMetadata(METADATA_KEY.METHOD, {
    httpMethod: HTTP_METHODS.POST,
    path,
  }) as MethodDecorator;

export const Put = (path: string) =>
  setMetadata(METADATA_KEY.METHOD, {
    httpMethod: HTTP_METHODS.PUT,
    path,
  }) as MethodDecorator;

export const Patch = (path: string) =>
  setMetadata(METADATA_KEY.METHOD, {
    httpMethod: HTTP_METHODS.PATCH,
    path,
  }) as MethodDecorator;

export const Delete = (path: string) =>
  setMetadata(METADATA_KEY.METHOD, {
    httpMethod: HTTP_METHODS.DELETE,
    path,
  }) as MethodDecorator;
