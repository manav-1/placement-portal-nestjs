import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { Response } from 'src/infra/response.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/middleware/authenticate.guard';
import { ApplicationInput, OpportunityInput } from './entities/opportunity.dto';
import { Roles } from 'src/infra/role/roles.decorator';
import { Role } from 'src/infra/role/roles.enum';

@ApiTags('Opportunity')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Roles()
@Controller('opportunity')
export class OpportunityController {
  constructor(
    private readonly oppService: OpportunityService,
    private readonly responseService: Response,
  ) {}

  @Get('')
  async getOpportunity() {
    try {
      const data = await this.oppService.getAllOpportunities();
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }

  @Roles(Role.ADMIN, Role.SUB_ADMIN, Role.SUPER_ADMIN)
  @Post('/add')
  async addOpportunity(@Body() body: OpportunityInput) {
    try {
      const data = await this.oppService.addOpportunity(body);
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }

  @Roles(Role.ADMIN, Role.SUB_ADMIN, Role.USER)
  @Post('/apply')
  async applyOpportunity(@Body() body: ApplicationInput) {
    try {
      const data = await this.oppService.applyOpportunity(body);
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }
}
