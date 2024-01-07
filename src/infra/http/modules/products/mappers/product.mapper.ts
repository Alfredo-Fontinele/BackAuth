import { Product } from '@application/entities/product.entity'

export class ProductMapper {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      name: product.props.name,
      price: product.props.price,
      quantity: product.props.quantity,
      created_at: product.props.created_at,
      updated_at: product.props.updated_at,
    }
  }
}
