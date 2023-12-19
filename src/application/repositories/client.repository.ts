import { Client } from '@application/entities/client.entity'

export abstract class ClientRepository {
  abstract create(client: Client): Promise<void>
  abstract findById(clientId: string): Promise<Client | null>
  abstract findByEmail(email: string): Promise<Client | null>
}
