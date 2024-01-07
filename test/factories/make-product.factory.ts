import { Product, ProductProps } from '@application/entities/product.entity'

type MakeClientProps = Partial<ProductProps>

export const makeProduct = (product: MakeClientProps = {}) => {
  return new Product({
    name: 'Notebook Gamer Acer Nitro 5 AMD Ryzen 7 5800H 8GB RAM 3200mhz',
    description: 'Ótimo Notebook para games',
    price: 4000,
    quantity: 1,
    ...product,
  })
}
