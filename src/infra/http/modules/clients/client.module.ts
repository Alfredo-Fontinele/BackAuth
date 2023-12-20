import { CreateClient } from '@application/usecases/clients/create-client'
import { FindAllClients } from '@application/usecases/clients/find-all'
import { FindClientById } from '@application/usecases/clients/find-client-by-id'
import { DatabaseModule } from '@infra/database/database.module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ClientController } from './controllers/client.controller'
import { ClientMiddlewares } from './middlewares/_index.middleware'

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [CreateClient, FindClientById, FindAllClients],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    ClientMiddlewares.configure(consumer)
  }
}
