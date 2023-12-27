import { Client } from '@application/entities/client.entity'
import { ClientRepository } from '@application/repositories/client.repository'
import { HashService } from '@helpers/hash-service'
import { Injectable } from '@nestjs/common'
import { PrismaClientMapper } from '../mappers/prisma-client.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaClientRepository implements ClientRepository {
  constructor(private prismaService: PrismaService) {}

  async create(client: Client) {
    const raw = PrismaClientMapper.toPrisma(client)
    const hashPassword = await HashService.hashPassword(raw.password)

    const newClient = await this.prismaService.client.create({
      data: {
        name: raw.name,
        email: raw.email,
        password: hashPassword,
      },
    })

    return PrismaClientMapper.toDomain(newClient)
  }

  async findAll() {
    const clients = await this.prismaService.client.findMany()
    return clients.map(PrismaClientMapper.toDomain)
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

  async verifyEmailExist(email: string): Promise<boolean> {
    const existEmail = await this.prismaService.client.findFirst({
      where: {
        email,
      },
    })

    return Boolean(existEmail)
  }
}
