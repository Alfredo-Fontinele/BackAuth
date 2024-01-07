import { Product } from '@application/entities/product.entity'
import { Product as ProductModelPrisma } from '@prisma/client'

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    return {
      name: product.props.name,
      description: product.props.description,
      price: product.props.price,
      quantity: product.props.quantity,
    }
  }

  static toDomain(raw: ProductModelPrisma) {
    return new Product(
      {
        name: raw.name,
        description: raw.description,
        price: +raw.price,
        quantity: +raw.quantity,
      },
      raw.id,
    )
  }
}
