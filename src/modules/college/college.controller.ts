import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CollegeService } from './college.service';
import { Response } from 'src/infra/response.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/middleware/authenticate.guard';
import { CollegeInput } from './dto/college.dto';
import { Roles } from 'src/infra/role/roles.decorator';
import { Role } from 'src/infra/role/roles.enum';

@ApiTags('College')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('college')
export class CollegeController {
  constructor(
    private readonly collegeService: CollegeService,
    private readonly responseService: Response,
  ) {}

  @Roles(Role.SUPER_ADMIN)
  @Post('/')
  async createCollege(@Body() body: CollegeInput) {
    try {
      const data = await this.collegeService.createCollege(body);
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }

  @Roles()
  @Get('/')
  async getAllCollege() {
    try {
      const data = await this.collegeService.getAllCollege();
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }
}
