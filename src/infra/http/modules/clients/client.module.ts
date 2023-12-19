import { Module } from '@nestjs/common'
import { ClientController } from './controllers/client.controller'

@Module({
  controllers: [ClientController],
})
export class ClientModule {}
