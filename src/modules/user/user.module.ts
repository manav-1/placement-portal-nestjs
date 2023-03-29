import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { HelperModule } from '../../helper/helper.module';
import { ResponseModule } from 'src/infra/response.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, HelperModule, ResponseModule],
})
export class UserModule {}
