import { Module } from '@nestjs/common';
import { CollegeAdminService } from './admin.service';
import { CollegeAdminController } from './admin.controller';

@Module({
  controllers: [CollegeAdminController],
  providers: [CollegeAdminService],
})
export class CollegeAdminModule {}
