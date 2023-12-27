import { Client } from '@application/entities/client.entity'

export abstract class ClientRepository {
  abstract create(client: Client): Promise<Client>
  abstract findAll(): Promise<Client[]>
  abstract findById(clientId: string): Promise<Client | null>
  abstract findByEmail(email: string): Promise<Client | null>
  abstract verifyEmailExist(email: string): Promise<boolean>
}
