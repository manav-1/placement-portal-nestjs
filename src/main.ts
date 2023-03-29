import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Placement Portal')
    .setDescription('The Placement Portal API description')
    .setVersion('1.0')
    .addTag('placement-portal')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
        name: 'Authorization',
        in: 'Header',
        description: `Please enter token in following format: Bearer <JWT>`,
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  const defaultSwaggerOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      authAction: {
        'access-token': {
          name: 'access-token',
          schema: {
            type: 'http',
            scheme: 'Bearer',
            bearerFormat: 'Bearer',
            name: 'Authorization',
            in: 'Header',
            description: `Please enter token in following format: Bearer <JWT>`,
          },
          value:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjZjZjYzg1LTFkMjYtNDNjNy1iZjhjLTlmNGE1NDlkMGU3NSIsImVtYWlsIjoibWFuYXY4MTEwMUBnbWFpbC5jb20iLCJuYW1lIjoiTWFuYXYiLCJtb2JpbGUiOiI4NzQ1MDA3OTM3Iiwicm9sZSI6IlNVUEVSX0FETUlOIiwiY3JlYXRlZEF0IjoiMjAyMy0wMy0xN1QxNToyNjo1NC42NzZaIiwidXBkYXRlZEF0IjoiMjAyMy0wMy0xN1QxNToyNjo1NC42NzZaIiwiY29sbGVnZUlkIjoiMzgzYWFiNTYtOWYwNS00M2M4LTkxMGItMGI2M2I2ZjUyYTgwIiwiaWF0IjoxNjc5MjQyMDAyLCJleHAiOjE2Nzk2NzQwMDJ9.dIkaYjh3efLbLmgyx9GiubTuW2hXl4za-GZvCnFtgEo',
        },
      },
    },
  };

  SwaggerModule.setup('docs', app, document, defaultSwaggerOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3005);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
