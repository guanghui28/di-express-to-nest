import { Controller } from '@decorators/controller.decorator';
import { Get } from '@decorators/method.decorator';
import { UserService } from '@services/user.service';

@Controller('/users')
export class UserController {
  public constructor(private userService: UserService) {}

  @Get('/')
  public create() {
    return this.userService.create();
  }
}
