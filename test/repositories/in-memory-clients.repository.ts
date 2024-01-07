import { Client } from '@application/entities/client.entity'
import { ClientRepository } from '@application/repositories/client.repository'
import { HashService } from '@helpers/hash-service'

export class InMemoryClientRepository implements ClientRepository {
  public clients: Client[] = []

  async create(client: Client): Promise<Client> {
    const hashPassword = await HashService.hashPassword(client.props.password)
    const alreadyExistClientByEmail = this.clients.find(
      (c) => c.props.email === client.props.email,
    )

    if (alreadyExistClientByEmail) {
      return alreadyExistClientByEmail
    }

    const clientWithHashPassword = new Client(
      {
        name: client.props.name,
        email: client.props.email,
        password: hashPassword,
      },
      client.id,
    )

    this.clients.push(clientWithHashPassword)
    return clientWithHashPassword
  }

  async findAll(): Promise<Client[]> {
    return this.clients
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

  async verifyEmailExist(email: string): Promise<boolean> {
    const existClientByEmail = this.clients.find(
      (client) => client.props.email === email,
    )

    return Boolean(existClientByEmail)
  }
}
