import { Client } from '@application/entities/client.entity'
import { ClientRepository } from '@application/repositories/client.repository'
import { HashService } from '@helpers/hash-service'
import { BadRequestException, Injectable } from '@nestjs/common'

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
    if (request.password !== request.confirm_password) {
      throw new BadRequestException('password must be equal confirm_password')
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
