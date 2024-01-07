import { Product } from '@application/entities/product.entity'
import { Injectable } from '@nestjs/common'
import { PrismaProductMapper } from '../mappers/prisma-product.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaProductRepository {
  constructor(private prismaService: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const raw = PrismaProductMapper.toPrisma(product)
    const newProduct = await this.prismaService.product.create({
      data: raw,
    })
    return PrismaProductMapper.toDomain(newProduct)
  }

  async update(product: Product): Promise<Product | null> {
    const raw = PrismaProductMapper.toPrisma(product)
    const updatedProduct = await this.prismaService.product.update({
      where: {
        id: product.id,
      },
      data: raw,
    })
    return PrismaProductMapper.toDomain(updatedProduct)
  }

  async findById(productId: string): Promise<Product | null> {
    const foundProductById = await this.prismaService.product.findFirst({
      where: {
        id: productId,
      },
    })
    if (!foundProductById) {
      return null
    }
    return PrismaProductMapper.toDomain(foundProductById)
  }

  async findByName(names: string) {
    const foundProductsByName = await this.prismaService.product.findMany({
      where: {
        name: {
          contains: names,
        },
      },
    })
    if (!foundProductsByName || foundProductsByName.length === 0) {
      return null
    }

    return foundProductsByName
    // return PrismaProductMapper.toDomain(foundProductsByName)
  }

  async findAll(): Promise<Product[]> {
    const response = await this.prismaService.product.findMany()
    return response.map(PrismaProductMapper.toDomain)
  }
}
