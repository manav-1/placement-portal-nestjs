import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OpportunityModule } from './modules/opportunity/opportunity.module';
import { LoggingMiddleware } from './infra/middleware/logging.middleware';
import { RequestId } from './infra/middleware/request-id.middleware';
import { CollegeModule } from './modules/college/college.module';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './infra/mail/mail.module';
import { CollegeAdminModule } from './modules/college-admin/college-admin.module';
import { CollegeAdminModule } from './modules/college-admin/college-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    AuthModule,
    OpportunityModule,
    CollegeModule,
    UserModule,
    MailModule,
    CollegeAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware, RequestId).forRoutes('*');
  }
}
