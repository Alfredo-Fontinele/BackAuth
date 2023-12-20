import { Client } from '@application/entities/client.entity'

export class ClientMapper {
  static toHTTP(client: Client) {
    return {
      id: client.id,
      name: client.props.name,
      email: client.props.email,
      created_at: client.props.created_at,
      updated_at: client.props.updated_at,
    }
  }
}
