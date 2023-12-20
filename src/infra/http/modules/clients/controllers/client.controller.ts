import { CreateClient } from '@application/usecases/clients/create-client'
import { FindAllClients } from '@application/usecases/clients/find-all'
import { FindClientById } from '@application/usecases/clients/find-client-by-id'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateClientDTO } from '../dtos/create-client.dto'
import { ClientMapper } from '../mappers/client.mapper'

@Controller('clients')
export class ClientController {
  constructor(
    private createClientCase: CreateClient,
    private findClientByIdCase: FindClientById,
    private findAllClientsCase: FindAllClients,
  ) {}

  @Post()
  async create(@Body() payload: CreateClientDTO) {
    const response = await this.createClientCase.execute(payload)
    return ClientMapper.toHTTP(response)
  }

  @Get('')
  async findAll() {
    return await this.findAllClientsCase.execute()
  }

  @Get(':id')
  async findClientById(@Param('id') id: string) {
    return await this.findClientByIdCase.execute({
      clientId: id,
    })
  }
}
