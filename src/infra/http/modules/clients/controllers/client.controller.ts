import { CreateClient } from '@application/usecases/clients/create-client'
import { FindClientById } from '@application/usecases/clients/find-client-by-id'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateClientDTO } from '../dtos/create-client.dto'

@Controller('clients')
export class ClientController {
  constructor(
    private createClientCase: CreateClient,
    private findClientByIdCase: FindClientById,
  ) {}

  @Post()
  async create(@Body() payload: CreateClientDTO) {
    this.createClientCase.execute(payload)
  }

  @Get(':id')
  async findClientById(@Param('id') id: string) {
    return await this.findClientByIdCase.execute({
      clientId: id,
    })
  }
}
