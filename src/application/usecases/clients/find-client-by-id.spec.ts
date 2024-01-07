import { makeClient } from '@test/factories/make-client.factory'
import { InMemoryClientRepository } from '@test/repositories/in-memory-clients.repository'
import { FindClientById } from './find-client-by-id'

describe('Find Client Case', () => {
  it('should be able to find client by id', async () => {
    const clientRepository = new InMemoryClientRepository()
    const findClientById = new FindClientById(clientRepository)
    const client = makeClient()

    await clientRepository.create(client)

    const response = await findClientById.execute({
      clientId: client.id,
    })

    expect(response).toBeTruthy()
    expect(clientRepository.clients[0].id).toBe(client.id)
  })
})
