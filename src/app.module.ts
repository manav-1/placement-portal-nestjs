import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OpportunityModule } from './modules/opportunity/opportunity.module';
import { LoggingMiddleware } from './infra/middleware/logging.middleware';
import { RequestId } from './infra/middleware/request-id.middleware';
import { CollegeModule } from './modules/college/college.module';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './infra/mail/mail.module';
import { CollegeAdminModule } from './modules/admin/admin.module';

console.log(process.env);
@Module({
  imports: [
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
