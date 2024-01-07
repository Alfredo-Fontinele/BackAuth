import { Product } from '@application/entities/product.entity'
import { makeProduct } from '@test/factories/make-product.factory'
import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository'
import { FindProductByName } from './find-product-by-name'

describe('Find Product By Name Case', () => {
  it('should be able to find a product by id', async () => {
    const productRepository = new InMemoryProductRepository()
    const findProductById = new FindProductByName(productRepository)

    const product = makeProduct()

    await productRepository.create(product)

    const response = await findProductById.execute({
      productName: product.props.name,
    })
    expect(response).toBeInstanceOf(Product)
  })
})
