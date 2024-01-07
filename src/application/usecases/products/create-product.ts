import { Product } from '@application/entities/product.entity'
import { ProductRepository } from '@application/repositories/product.repository'
import { ConflictException, Injectable } from '@nestjs/common'
import { formatName } from '@utils/format-text'

type CreateProductRequest = {
  name: string
  description: string
  price: number
  quantity: number
}

type CreateProductResponse = Product

@Injectable()
export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
    const productAlreadyExist = await this.productRepository.findByName(
      request.name,
    )

    if (productAlreadyExist) {
      throw new ConflictException('product name already exist')
    }

    const product = new Product({
      name: formatName(request.name),
      description: request.description,
      price: request.price,
      quantity: request.quantity,
    })

    return await this.productRepository.create(product)
  }
}
