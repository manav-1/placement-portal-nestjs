import { Module } from '@nestjs/common';
import { CollegeAdminService } from './college-admin.service';
import { CollegeAdminController } from './college-admin.controller';

@Module({
  controllers: [CollegeAdminController],
  providers: [CollegeAdminService],
})
export class CollegeAdminModule {}
