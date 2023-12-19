import { ClientRepository } from '@application/repositories/client.repository'
import { Constants } from '@infra/constants'

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
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
    const client = await this.clientRepository.findByEmail(request.email)

    if (!client) {
      throw new NotFoundException('client not found')
    }

    if (client.props.password !== request.password) {
      throw new UnauthorizedException('client not authenticated')
    }

    const payload = { sub: client.id, email: client.props.email }

    const access_token = await this.jwtService.signAsync(payload, {
      secret: Constants.SECRET,
    })

    return {
      access_token,
    }
  }
}
