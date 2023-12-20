import { Client } from '@application/entities/client.entity'
import { Client as ClientModelPrisma } from '@prisma/client'

export class PrismaClientMapper {
  static toPrisma(client: Client) {
    return {
      name: client.props.name,
      email: client.props.email,
      password: client.props.password,
    }
  }

  static toDomain(raw: ClientModelPrisma) {
    return new Client(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      raw.id,
    )
  }
}
