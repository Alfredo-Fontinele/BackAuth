import { Client } from '@application/entities/client.entity'
import { ClientRepository } from '@application/repositories/client.repository'
import { HashService } from '@helpers/hash-service'
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common'
import { validatedRegexPassword } from '@utils/validate-password-regex'

type CreateClientRequest = {
  name: string
  email: string
  password: string
  confirm_password: string
}

type CreateClientResponse = Client

@Injectable()
export class CreateClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(request: CreateClientRequest): Promise<CreateClientResponse> {
    const isValidPassword = validatedRegexPassword(request.password)

    if (!isValidPassword) {
      throw new BadRequestException(
        'password must be at least 8 characters long, containing letters, numbers, and at least one symbol',
      )
    }

    if (request.password !== request.confirm_password) {
      throw new BadRequestException('password must be equal confirm_password')
    }

    const clientAlreadyExistByEmail = await this.clientRepository.findByEmail(
      request.email,
    )

    if (clientAlreadyExistByEmail) {
      throw new ConflictException('client email already exist')
    }

    const hashPassword = await HashService.hashPassword(request.password)

    const client = new Client({
      name: request.name,
      email: request.email,
      password: hashPassword,
    })

    return await this.clientRepository.create(client)
  }
}
