import { Client } from '@application/entities/client.entity'
import { ClientRepository } from '@application/repositories/client.repository'

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = []

  async create(client: Client): Promise<void> {
    this.clients.push(client)
  }

  async findById(clientId: string): Promise<Client | null> {
    const existClientById = this.clients.find(
      (client) => client.id === clientId,
    )
    if (!existClientById) {
      return null
    }
    return existClientById
  }

  async findByEmail(email: string): Promise<Client | null> {
    const existClientByEmail = this.clients.find(
      (client) => client.props.email === email,
    )
    if (!existClientByEmail) {
      return null
    }
    return existClientByEmail
  }
}
