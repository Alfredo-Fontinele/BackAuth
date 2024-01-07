import { Client } from '@application/entities/client.entity'
import { Injectable } from '@nestjs/common'
import { PrismaClientMapper } from '../mappers/prisma-client.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaClientRepository {
  constructor(private prismaService: PrismaService) {}

  async create(client: Client): Promise<Client> {
    const raw = PrismaClientMapper.toPrisma(client)
    const newClient = await this.prismaService.client.create({
      data: raw,
    })
    return PrismaClientMapper.toDomain(newClient)
  }

  async findAll() {
    const allClients = await this.prismaService.client.findMany()
    return allClients.map(PrismaClientMapper.toDomain)
  }

  async findById(clientId: string): Promise<Client | null> {
    const foundClientById = await this.prismaService.client.findFirst({
      where: {
        id: clientId,
      },
    })
    if (!foundClientById) {
      return null
    }
    return PrismaClientMapper.toDomain(foundClientById)
  }

  async findByEmail(email: string): Promise<Client | null> {
    const foundClientByEmail = await this.prismaService.client.findFirst({
      where: {
        email,
      },
    })
    if (!foundClientByEmail) {
      return null
    }
    return PrismaClientMapper.toDomain(foundClientByEmail)
  }
}
