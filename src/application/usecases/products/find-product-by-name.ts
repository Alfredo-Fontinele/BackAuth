import { Product } from '@application/entities/product.entity'
import { ProductRepository } from '@application/repositories/product.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

type FindProductByNameRequest = {
  productName: string
}

type FindProductByNameResponse = Product

@Injectable()
export class FindProductByName {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    request: FindProductByNameRequest,
  ): Promise<FindProductByNameResponse> {
    const foundProductByName = await this.productRepository.findByName(
      request.productName,
    )

    if (!foundProductByName) {
      throw new NotFoundException('product not found by name')
    }

    return foundProductByName
  }
}
