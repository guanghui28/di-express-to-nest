import { setMetadata } from '@core/metadata/metadata';
import { METADATA_KEY } from '../utils/constants';

export const Controller = (path = '') =>
  setMetadata(METADATA_KEY.CONTROLLER, {
    path,
  }) as ClassDecorator;
