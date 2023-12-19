import { Constants } from '@infra/constants'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ClientModule } from '../clients/client.module'
import { AuthController } from './controllers/auth.controller'

@Module({
  imports: [
    ClientModule,
    JwtModule.register({
      secret: Constants.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
