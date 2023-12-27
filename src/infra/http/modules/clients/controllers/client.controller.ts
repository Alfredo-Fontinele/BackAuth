import { CreateClient } from '@application/usecases/clients/create-client'
import { FindAllClients } from '@application/usecases/clients/find-all'
import { FindClientById } from '@application/usecases/clients/find-client-by-id'
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ValidationTokenGuard } from '../../auth/guards/validation-token.guard'
import { CreateClientDTORequest } from '../dtos/create-client-request.dto'
import { CreateClientDTOResponse201 } from '../dtos/create-client-response.dto'
import { FindAllClientsDTOResponse200 } from '../dtos/find-all-clients-response.dto'
import {
  FindClientDTOResponse200,
  FindClientDTOResponse404,
} from '../dtos/find-client-response.dto'
import { ClientAlreadyExistGuard } from '../guards/client-already-exist.guard'
import { ClientMapper } from '../mappers/client.mapper'

@Controller('clients')
@ApiTags('client')
export class ClientController {
  constructor(
    private createClientCase: CreateClient,
    private findClientByIdCase: FindClientById,
    private findAllClientsCase: FindAllClients,
  ) {}

  @Post()
  @UseGuards(ClientAlreadyExistGuard)
  @ApiOperation({ summary: 'Create Client' })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: CreateClientDTOResponse201,
  })
  async create(@Body() payload: CreateClientDTORequest) {
    const response = await this.createClientCase.execute(payload)
    return ClientMapper.toHTTP(response)
  }

  @Get()
  @UseGuards(ValidationTokenGuard)
  @ApiOperation({ summary: 'Find All Clients' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: FindAllClientsDTOResponse200,
    isArray: true,
  })
  async findAll() {
    const response = await this.findAllClientsCase.execute()
    return response.map(ClientMapper.toHTTP)
  }

  @Get(':id')
  @UseGuards(ValidationTokenGuard)
  @ApiOperation({ summary: 'Find Client By Id' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: FindClientDTOResponse200,
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: FindClientDTOResponse404,
  })
  async findClientById(@Param('id') id: string) {
    const response = await this.findClientByIdCase.execute({
      clientId: id,
    })
    return ClientMapper.toHTTP(response)
  }
}
