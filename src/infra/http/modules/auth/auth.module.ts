import { GetProfile } from '@application/usecases/auth/get-profile'
import { SignIn } from '@application/usecases/auth/sign-in'
import { CONSTANTS } from '@infra/constants'
import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ClientModule } from '../clients/client.module'
import { AuthController } from './controllers/auth.controller'

@Module({
  imports: [
    DatabaseModule,
    ClientModule,
    JwtModule.register({
      secret: CONSTANTS.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [SignIn, GetProfile],
})
export class AuthModule {}
