import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { HelperModule } from '../../helper/helper.module';
import { ResponseModule } from 'src/infra/response.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, HelperModule, ResponseModule],
})
export class AuthModule {}
