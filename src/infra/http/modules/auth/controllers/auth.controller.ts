import { GetProfile } from '@application/usecases/auth/get-profile'
import { SignIn } from '@application/usecases/auth/sign-in'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import {
  FindClientResponse200_DTO,
  FindClientResponse404_DTO,
} from '../../clients/dtos/find-client-response.dto'
import { SignInRequestDTO } from '../dtos/sign-in-request.dto'
import {
  SignInDTOResponse200,
  SignInDTOResponse401,
} from '../dtos/sign-in-response.dto'
import { ValidationTokenGuard } from '../guards/validation-token.guard'
import { AuthMapper } from '../mappers/auth.mapper'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private signInCase: SignIn,
    private getProfileCase: GetProfile,
  ) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: SignInDTOResponse200,
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: SignInDTOResponse401,
  })
  async signIn(@Body() payload: SignInRequestDTO) {
    return await this.signInCase.execute(payload)
  }

  @Get('profile')
  @UseGuards(ValidationTokenGuard)
  @ApiOperation({ summary: 'Get Profile' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: FindClientResponse200_DTO,
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: FindClientResponse404_DTO,
  })
  async getProfile(@Req() req: Request) {
    const response = await this.getProfileCase.execute({
      authorization: req.headers.authorization,
    })
    return AuthMapper.toHTTP(response)
  }
}
