import { Injectable } from '../decorators/constructor.decorator.ts';

@Injectable()
export class UserService {
  public create() {
    console.log('create a user');
  }
}
