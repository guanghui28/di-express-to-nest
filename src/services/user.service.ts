import { Injectable } from '@decorators/injectable.decorator';

@Injectable()
export class UserService {
  public create() {
    console.log('create a user');
  }
}
