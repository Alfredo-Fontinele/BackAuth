import { CONSTANTS } from '@infra/constants'
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { extractToken } from '@utils/extract-token'

@Injectable()
export class ValidationTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = extractToken(request.headers.authorization)

    if (!token) {
      throw new UnauthorizedException('token unexist')
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: CONSTANTS.SECRET,
      })
    } catch {
      throw new UnauthorizedException('client not authenticated')
    }

    return true
  }
}
