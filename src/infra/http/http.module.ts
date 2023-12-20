import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { ClientModule } from './modules/clients/client.module'

@Module({
  imports: [DatabaseModule, AuthModule, ClientModule],
})
export class HTTPModule {}
