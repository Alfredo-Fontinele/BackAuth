import { ClientRepository } from '@application/repositories/client.repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaClientRepository } from './prisma/repositories/prisma-client.repository'

@Module({
  providers: [
    PrismaService,
    {
      useClass: PrismaClientRepository,
      provide: ClientRepository,
    },
  ],
  exports: [ClientRepository],
})
export class DatabaseModule {}
