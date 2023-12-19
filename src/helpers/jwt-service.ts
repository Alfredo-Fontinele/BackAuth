import { JwtService } from '@nestjs/jwt'

export type DecodeTokenResponse = {
  sub: string
  email: string
  iat: number
}

export const jwtService = new JwtService()
