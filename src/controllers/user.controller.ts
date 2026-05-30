import { BadRequestException } from '@core/base/error.base';
import { Controller } from '@decorators/controller.decorator';
import { Get, Post } from '@decorators/method.decorator';
import { Body } from '@decorators/param.decorator';
import { UserService } from '@services/user.service';

@Controller('/user')
export class UserController {
  public constructor(private userService: UserService) {}

  @Post('/')
  public create(@Body() _body: object) {
    return this.userService.create();
  }

  @Get('/')
  public find() {
    throw new BadRequestException('unauthorized');

    return 'all users';
  }

  @Get('/:id')
  public findOne() {
    return 'a user';
  }
}
