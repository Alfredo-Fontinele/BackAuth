import { Product } from '@application/entities/product.entity'
import { ProductRepository } from '@application/repositories/product.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

type FindProductByIdRequest = {
  productId: string
}

type FindProductByIdResponse = Product

@Injectable()
export class FindProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    request: FindProductByIdRequest,
  ): Promise<FindProductByIdResponse> {
    const foundProductById = await this.productRepository.findById(
      request.productId,
    )
    if (!foundProductById) {
      throw new NotFoundException('product not found by id')
    }
    return foundProductById
  }
}
