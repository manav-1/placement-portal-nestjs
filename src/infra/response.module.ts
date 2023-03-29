import { Module } from '@nestjs/common';
import { Response } from './response.service';

@Module({
  providers: [Response],
  exports: [Response],
})
export class ResponseModule {}
