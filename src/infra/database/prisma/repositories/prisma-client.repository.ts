import { Client } from '@application/entities/client.entity'
import { HashService } from '@helpers/hash-service'
import { Injectable } from '@nestjs/common'
import { PrismaClientMapper } from '../mappers/prisma-client.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaClientRepository {
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
    return await this.prismaService.client.findMany()
  }
}
