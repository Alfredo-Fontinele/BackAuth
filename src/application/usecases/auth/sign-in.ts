import { ClientRepository } from '@application/repositories/client.repository'
import { HashService } from '@helpers/hash-service'
import { CONSTANTS } from '@infra/CONSTANTS'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

type SignInRequest = {
  email: string
  password: string
}

type SignInResponse = {
  access_token: string
}

@Injectable()
export class SignIn {
  constructor(
    private jwtService: JwtService,
    private clientRepository: ClientRepository,
  ) {}

  async execute(request: SignInRequest): Promise<SignInResponse> {
    const clientExistByEmail = await this.clientRepository.findByEmail(
      request.email,
    )

    if (!clientExistByEmail) {
      throw new UnauthorizedException('client not found')
    }

    const isValidPassword = await HashService.comparePassword(
      request.password,
      clientExistByEmail.props.password,
    )

    if (!isValidPassword) {
      throw new UnauthorizedException('client not authenticated')
    }

    const payload = {
      sub: clientExistByEmail.id,
      email: clientExistByEmail.props.email,
    }

    const access_token = await this.jwtService.signAsync(payload, {
      secret: CONSTANTS.SECRET,
    })

    return {
      access_token,
    }
  }
}
