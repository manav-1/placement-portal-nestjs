import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityController } from './opportunity.controller';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { HelperModule } from '../../helper/helper.module';
import { ResponseModule } from 'src/infra/response.module';

@Module({
  controllers: [OpportunityController],
  providers: [OpportunityService],
  imports: [PrismaModule, HelperModule, ResponseModule],
})
export class OpportunityModule {}
