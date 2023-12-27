import { ClientRepository } from '@application/repositories/client.repository'
import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'

@Injectable()
export class ClientAlreadyExistGuard implements CanActivate {
  constructor(private clientRepository: ClientRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const alreadyExistClient = await this.clientRepository.verifyEmailExist(
      request.body.email,
    )

    if (alreadyExistClient) {
      throw new ConflictException('client already exist')
    }

    return true
  }
}
