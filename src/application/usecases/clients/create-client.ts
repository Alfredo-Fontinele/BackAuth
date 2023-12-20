import { Client } from '@application/entities/client.entity'
import { ClientRepository } from '@application/repositories/client.repository'
import { Injectable } from '@nestjs/common'

type CreateClientRequest = {
  name: string
  email: string
  password: string
}

type CreateClientResponse = Client

@Injectable()
export class CreateClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(request: CreateClientRequest): Promise<CreateClientResponse> {
    const client = new Client({
      name: request.name,
      email: request.email,
      password: request.password,
    })

    return await this.clientRepository.create(client)
  }
}
