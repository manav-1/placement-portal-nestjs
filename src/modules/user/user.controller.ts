import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'src/infra/response.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/middleware/authenticate.guard';
import { Roles } from 'src/infra/role/roles.decorator';
import { Role } from 'src/infra/role/roles.enum';
import { Helper } from 'src/helper/helper.service';

@ApiTags('User')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Roles()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: Response,
  ) {}

  @Get()
  async abc() {
    return 'Hello World';
  }

  @Roles(Role.ADMIN, Role.SUB_ADMIN, Role.SUPER_ADMIN)
  @Get('/all')
  async getAllUsersFromCollege() {
    try {
      const data = await this.userService.getAllUsersFromCollege();
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }

  @Get('/profile')
  async getUserProfile() {
    try {
      const data = await this.userService.getUserProfile();
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }
}
