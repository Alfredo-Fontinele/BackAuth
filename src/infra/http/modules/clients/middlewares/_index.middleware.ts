import { MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { CreateClientMiddleware } from './create-client.middleware'

export class ClientMiddlewares {
  static configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateClientMiddleware).forRoutes({
      method: RequestMethod.POST,
      path: 'clients',
    })
  }
}
