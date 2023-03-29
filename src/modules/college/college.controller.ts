import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CollegeService } from './college.service';
import { Response } from 'src/infra/response.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/middleware/authenticate.guard';
import { CollegeInput } from './entities/college.dto';
import { Roles } from 'src/infra/role/roles.decorator';
import { Role } from 'src/infra/role/roles.enum';

@ApiTags('College')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Roles(Role.SUPER_ADMIN)
@Controller('college')
export class CollegeController {
  constructor(
    private readonly collegeService: CollegeService,
    private readonly responseService: Response,
  ) {}

  @Post('/')
  async createCollege(@Body() body: CollegeInput) {
    try {
      const data = await this.collegeService.createCollege(body);
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }
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
