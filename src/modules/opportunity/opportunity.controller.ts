import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { Response } from 'src/infra/response.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/middleware/authenticate.guard';
import { OpportunitySelector, OpportunityInput } from './dto/opportunity.dto';
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

  @Get('/')
  async getOpportunity() {
    try {
      const data = await this.oppService.getAllOpportunities();
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }

  @Roles(Role.ADMIN, Role.SUB_ADMIN, Role.SUPER_ADMIN)
  @Post('/')
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
  async applyOpportunity(@Body() body: OpportunitySelector) {
    try {
      const data = await this.oppService.applyOpportunity(body);
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }

  @Roles(Role.ADMIN, Role.SUB_ADMIN, Role.SUPER_ADMIN)
  @Delete('/:opportunityId')
  async deleteOpportunity(@Param() params: OpportunitySelector) {
    try {
      const data = await this.oppService.deleteOpportunity(params);
      return this.responseService.Success(data);
    } catch (e) {
      return this.responseService.Fail(e);
    }
  }
}
