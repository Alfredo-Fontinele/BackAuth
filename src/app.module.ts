import { HTTPModule } from '@infra/http/http.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), HTTPModule],
})
export class AppModule {}
