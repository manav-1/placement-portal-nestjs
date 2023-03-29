import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { HelperModule } from '../../helper/helper.module';
import { ResponseModule } from 'src/infra/response.module';

@Module({
  controllers: [CollegeController],
  providers: [CollegeService],
  imports: [PrismaModule, HelperModule, ResponseModule],
})
export class CollegeModule {}
