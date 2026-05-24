import { Controller } from '../decorators/constructor.decorator.ts';
import { Get } from '../decorators/method.decorator.ts';
import { UserService } from '../services/user.service.ts';

@Controller('/users')
export class UserController {
  public constructor(private userService: UserService) {}

  @Get('/')
  public create() {
    return this.userService.create();
  }
}
