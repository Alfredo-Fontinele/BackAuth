import { CreateClient } from '@application/usecases/clients/create-client'
import { FindAllClients } from '@application/usecases/clients/find-all'
import { FindClientById } from '@application/usecases/clients/find-client-by-id'
import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ClientController } from './controllers/client.controller'

@Module({
  imports: [JwtModule, DatabaseModule],
  controllers: [ClientController],
  providers: [CreateClient, FindClientById, FindAllClients],
})
export class ClientModule {}
