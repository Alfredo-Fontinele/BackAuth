import { HTTPModule } from '@infra/http/http.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
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
  providers: [],
})
export class AppModule {}
