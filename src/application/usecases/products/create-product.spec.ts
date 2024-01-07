import { Product } from '@application/entities/product.entity'
import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository'
import { CreateProduct } from './create-product'

describe('Create Product Case', () => {
  it('should be able to create a product', async () => {
    const productRepository = new InMemoryProductRepository()
    const createProduct = new CreateProduct(productRepository)

    const response = await createProduct.execute({
      name: 'Notebook Gamer Acer Nitro 5 AMD Ryzen 7 5800H',
      description: 'Ótimo notebook para games',
      price: 4000,
      quantity: 1,
    })

    expect(response).toBeInstanceOf(Product)
    expect(response).toHaveProperty('id')
  })
})
