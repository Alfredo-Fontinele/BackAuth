import { SignIn } from '@application/usecases/auth/sign-in'
import { Constants } from '@infra/constants'
import { DatabaseModule } from '@infra/database/database.module'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ClientModule } from '../clients/client.module'
import { AuthController } from './controllers/auth.controller'
import { AuthMiddlewares } from './middlewares/_index.middleware'

@Module({
  imports: [
    DatabaseModule,
    ClientModule,
    JwtModule.register({
      secret: Constants.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [SignIn],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    AuthMiddlewares.configure(consumer)
  }
}
