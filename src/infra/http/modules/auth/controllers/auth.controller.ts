import { SignIn } from '@application/usecases/auth/sign-in'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { SignInDTO } from '../dtos/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private signInCase: SignIn) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDTO) {
    return this.signInCase.execute(signInDto)
  }
}
