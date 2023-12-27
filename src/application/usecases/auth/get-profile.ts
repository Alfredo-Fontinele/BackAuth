// import { Client } from '@application/entities/client.entity'
// import { ClientRepository } from '@application/repositories/client.repository'
// import { Injectable, NotFoundException } from '@nestjs/common'

// export type ValidationTokenResponse = {
//   sub: string
//   email: string
//   iat: number
//   exp: number
// }

// type GetProfileRequest = {
//   email: string
// }

// type GetProfileResponse = Client

// @Injectable()
// export class GetProfile {
//   constructor(private clientRepository: ClientRepository) {}

//   async execute(request: GetProfileRequest): Promise<GetProfileResponse> {
//     const foundClientByEmail = await this.clientRepository.findByEmail(
//       request.email,
//     )
//     if (!foundClientByEmail) {
//       throw new NotFoundException('client not found with get profile')
//     }
//     return foundClientByEmail
//   }
// }

import { Client } from '@application/entities/client.entity'
import { ClientRepository } from '@application/repositories/client.repository'
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { extractToken } from '@utils/extract-token'

export type ValidationTokenResponse = {
  sub: string
  email: string
  iat: number
  exp: number
}

type GetProfileRequest = {
  authorization?: string
}

type GetProfileResponse = Client

@Injectable()
export class GetProfile {
  constructor(
    private jwtService: JwtService,
    private clientRepository: ClientRepository,
  ) {}

  async execute(request: GetProfileRequest): Promise<GetProfileResponse> {
    const token = extractToken(request.authorization)

    if (!token) {
      throw new UnauthorizedException('token unexist')
    }

    const validAccessToken: ValidationTokenResponse =
      await this.jwtService.decode(token)

    if (!validAccessToken) {
      throw new UnauthorizedException('invalid token')
    }

    const foundClientByEmail = await this.clientRepository.findByEmail(
      validAccessToken.email,
    )

    if (!foundClientByEmail) {
      throw new NotFoundException('client not found with get profile')
    }

    return foundClientByEmail
  }
}
