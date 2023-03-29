import { Controller, Post, Body, Query, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'src/infra/response.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginInput, RegisterInput, PropertyInput } from './entities/auth.dto';
import { AuthGuard } from 'src/infra/middleware/authenticate.guard';
import { Roles } from 'src/infra/role/roles.decorator';

@ApiTags('Auth')
@Roles()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: Response,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginInput) {
    try {
      const data = await this.authService.login(body);
      return this.responseService.Success(data);
    } catch (e) {
      console.log(e);
      return this.responseService.Fail({ ...e });
    }
  }
  @Post('/signup')
  async signup(@Body() body: RegisterInput) {
    try {
      const data = await this.authService.register(body);
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }

  @Get('/user')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  async userProperty(@Query() property: PropertyInput) {
    try {
      const data = await this.authService.getProperty(property);
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }
  @Get('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  async user() {
    try {
      return this.responseService.Success({ valid: true });
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }
}
