import { Entity } from '@core/domain/entity'

export type ProductProps = {
  name: string
  description: string
  quantity: number
  price: number
  created_at?: Date
  updated_at?: Date
}

export class Product extends Entity<ProductProps> {
  constructor(props: ProductProps, id?: string) {
    super(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    )
  }

  update() {
    this.props.updated_at = new Date()
  }
}
