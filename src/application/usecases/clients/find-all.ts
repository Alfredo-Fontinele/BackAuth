import { ClientRepository } from '@application/repositories/client.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindAllClients {
  constructor(private clientRepository: ClientRepository) {}

  async execute() {
    return await this.clientRepository.findAll()
  }
}
