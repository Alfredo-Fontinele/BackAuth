import { Product } from '@application/entities/product.entity'
import { ProductRepository } from '@application/repositories/product.repository'

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = []

  async create(product: Product): Promise<Product> {
    const alreadyExistProductByName = this.products.find(
      (p) => p.props.name === product.props.name,
    )

    if (alreadyExistProductByName) {
      return alreadyExistProductByName
    }

    const productData = new Product(
      {
        name: product.props.name,
        description: product.props.description,
        price: product.props.price,
        quantity: product.props.quantity,
      },
      product.id,
    )

    this.products.push(productData)
    return productData
  }

  async findAll(): Promise<Product[]> {
    return this.products
  }

  async findById(productId: string): Promise<Product | null> {
    const existproductById = this.products.find(
      (product) => product.id === productId,
    )

    if (!existproductById) {
      return null
    }

    return existproductById
  }

  async findByName(name: string): Promise<Product | null> {
    const existProductByName = this.products.find(
      (product) => product.props.name === name,
    )

    if (!existProductByName) {
      return null
    }

    return existProductByName
  }

  async update(product: Product): Promise<Product | null> {
    const productIndex = this.products.findIndex((p) => p.id === product.id)

    if (!productIndex) {
      return null
    }

    this.products[productIndex] = product
    return this.products[productIndex]
  }
}
