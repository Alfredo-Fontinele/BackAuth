import { Client } from '@application/entities/client.entity'
import { ClientRepository } from '@application/repositories/client.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

type FindClientByIdRequest = {
  clientId: string
}

type FindClientByIdResponse = Client

@Injectable()
export class FindClientById {
  constructor(private clientRepository: ClientRepository) {}

  async execute(
    request: FindClientByIdRequest,
  ): Promise<FindClientByIdResponse> {
    const existClient = await this.clientRepository.findById(request.clientId)
    if (!existClient) {
      throw new NotFoundException('client not found')
    }
    return existClient
  }
}
