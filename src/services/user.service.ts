import { Injectable } from '@decorators/constructor.decorator';

@Injectable()
export class UserService {
  public create() {
    console.log('create a user');
  }
}
