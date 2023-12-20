import { MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { LoginMiddleware } from '../../auth/middlewares/login.middleware'

export class AuthMiddlewares {
  static configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes({
      method: RequestMethod.POST,
      path: 'auth/sign-in',
    })
  }
}
