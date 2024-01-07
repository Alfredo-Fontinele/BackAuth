import { Product } from '@application/entities/product.entity'
import { makeProduct } from '@test/factories/make-product.factory'
import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository'
import { FindProductById } from './find-product-by-id'

describe('Find Product By Id Case', () => {
  it('should be able to find a product by id', async () => {
    const productRepository = new InMemoryProductRepository()
    const findProductById = new FindProductById(productRepository)

    const product = makeProduct()

    await productRepository.create(product)

    const response = await findProductById.execute({
      productId: product.id,
    })
    expect(response).toBeInstanceOf(Product)
  })
})
