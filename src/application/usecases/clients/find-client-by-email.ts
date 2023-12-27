import { Client } from '@application/entities/client.entity'
import { ClientRepository } from '@application/repositories/client.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

type FindClientByEmailRequest = {
  email: string
}

type FindClientByEmailResponse = Client

@Injectable()
export class FindClientByEmail {
  constructor(private clientRepository: ClientRepository) {}

  async execute(
    request: FindClientByEmailRequest,
  ): Promise<FindClientByEmailResponse> {
    const existClient = await this.clientRepository.findByEmail(request.email)
    if (!existClient) {
      throw new NotFoundException('client not found by emailLLLLL')
    }
    return existClient
  }
}
