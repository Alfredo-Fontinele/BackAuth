import { Product } from '@application/entities/product.entity'

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>
  abstract update(product: Product): Promise<Product | null>
  abstract findById(productId: string): Promise<Product | null>
  abstract findByName(name: string): Promise<Product | null>
  abstract findAll(): Promise<Product[]>
}
