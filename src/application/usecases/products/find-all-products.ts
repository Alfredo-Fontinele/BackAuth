import { ProductRepository } from '@application/repositories/product.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindAllProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute() {
    return await this.productRepository.findAll()
  }
}
