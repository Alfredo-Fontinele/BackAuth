import { Client } from '@application/entities/client.entity'
import { InMemoryClientRepository } from '@test/repositories/clients/in-memory-clients.repository'
import { CreateClient } from './create-client'

describe('Create Client Case', () => {
  it('should be able to create a client', async () => {
    const clientRepository = new InMemoryClientRepository()

    const createClient = new CreateClient(clientRepository)

    await createClient.execute({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'teste',
    })

    expect(clientRepository.clients).toHaveLength(1)
    expect(clientRepository.clients[0]).toBeInstanceOf(Client)
  })
})
