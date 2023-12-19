import { Entity } from '@core/domain/entity'

type ClientProps = {
  name: string
  email: string
  password: string
  created_at?: Date
  updated_at?: Date
}

export class Client extends Entity<ClientProps> {
  constructor(props: ClientProps, id?: string) {
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
