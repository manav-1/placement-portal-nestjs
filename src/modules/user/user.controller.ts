import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'src/infra/response.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/middleware/authenticate.guard';
import { Roles } from 'src/infra/role/roles.decorator';
import { Role } from 'src/infra/role/roles.enum';
import { Prisma } from '@prisma/client';

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

  @Roles(Role.ADMIN, Role.SUB_ADMIN, Role.SUPER_ADMIN)
  @Get('/college')
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

  @Post('/profile')
  async updateUserProfile(
    @Body() body: Prisma.UserProfileUncheckedUpdateInput,
  ) {
    try {
      const data = await this.userService.updateUserProfile(body);
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }
}
