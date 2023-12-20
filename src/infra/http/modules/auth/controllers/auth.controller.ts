import { SignIn } from '@application/usecases/auth/sign-in'
import { Body, Controller, Post } from '@nestjs/common'
import { SignInDTO } from '../dtos/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private signInCase: SignIn) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDTO) {
    return await this.signInCase.execute(signInDto)
  }
}
