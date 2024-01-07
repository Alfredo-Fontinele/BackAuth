import { CreateClient } from '@application/usecases/clients/create-client'
import { FindAllClients } from '@application/usecases/clients/find-all'
import { FindClientById } from '@application/usecases/clients/find-client-by-id'
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ValidationTokenGuard } from '../../auth/guards/validation-token.guard'
import { CreateClientRequest_DTO } from '../dtos/create-client-request.dto'
import { CreateClientResponse201_DTO } from '../dtos/create-client-response.dto'
import { FindAllClientsResponse200_DTO } from '../dtos/find-all-clients-response.dto'
import {
  FindClientResponse200_DTO,
  FindClientResponse404_DTO,
} from '../dtos/find-client-response.dto'
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
  @ApiOperation({ summary: 'Create Client' })
  @ApiResponse({
    status: 201,
    description: 'created',
    type: CreateClientResponse201_DTO,
  })
  async create(@Body() payload: CreateClientRequest_DTO) {
    const response = await this.createClientCase.execute(payload)
    return ClientMapper.toHTTP(response)
  }

  @Get()
  @UseGuards(ValidationTokenGuard)
  @ApiOperation({ summary: 'Find All Clients' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: FindAllClientsResponse200_DTO,
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
    type: FindClientResponse200_DTO,
  })
  @ApiResponse({
    status: 404,
    description: 'not found',
    type: FindClientResponse404_DTO,
  })
  async findById(@Param('id') id: string) {
    const response = await this.findClientByIdCase.execute({
      clientId: id,
    })
    return ClientMapper.toHTTP(response)
  }
}
