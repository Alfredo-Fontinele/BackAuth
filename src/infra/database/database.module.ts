import { ClientRepository } from '@application/repositories/client.repository'
import { ProductRepository } from '@application/repositories/product.repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaClientRepository } from './prisma/repositories/prisma-client.repository'
import { PrismaProductRepository } from './prisma/repositories/prisma-product.repository'

@Module({
  providers: [
    PrismaService,
    {
      useClass: PrismaClientRepository,
      provide: ClientRepository,
    },
    {
      useClass: PrismaProductRepository,
      provide: ProductRepository,
    },
  ],
  exports: [ClientRepository, ProductRepository],
})
export class DatabaseModule {}
