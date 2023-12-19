import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { ClientModule } from './modules/clients/client.module'

@Module({
  imports: [ClientModule, AuthModule],
})
export class HTTPModule {}
