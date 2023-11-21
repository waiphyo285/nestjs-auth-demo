import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { GlobalExceptionFilter } from 'src/config/handlers/catch-exception';
import { TransformationInterceptor } from 'src/config/handlers/response-success';
import { ModifyRequest } from './middleware/modify-request';

import { AuthModule } from './auth/auth.module';
import { PostModule } from './posts/post.module';
import { OrganizationModule } from './organizations/organization.module';
import { PrismaModule } from './prisma/prisma.module';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
});

@Module({
  imports: [
    envModule,

    PrismaModule,

    AuthModule,
    PostModule,
    OrganizationModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformationInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ModifyRequest).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
