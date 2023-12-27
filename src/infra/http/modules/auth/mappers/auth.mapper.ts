import { Client } from '@application/entities/client.entity'

export class AuthMapper {
  static toHTTP(client: Client) {
    return {
      id: client.id,
      email: client.props.email,
      name: client.props.email,
      password: client.props.email,
      created_at: client.props.email,
      updated_at: client.props.updated_at,
    }
  }
}
