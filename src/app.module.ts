import { HandlerErrorGlobal } from '@infra/http/handlers/handler-error-global.filter'
import { HTTPModule } from '@infra/http/http.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 3,
      },
    ]),
    HTTPModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HandlerErrorGlobal,
    },
  ],
})
export class AppModule {}
