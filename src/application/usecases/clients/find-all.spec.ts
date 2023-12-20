import { makeClient } from '@test/factories/make-client.factory'
import { InMemoryClientRepository } from '@test/repositories/clients/in-memory-clients.repository'
import { FindAllClients } from './find-all'

describe('Find All Clients Case', () => {
  it('should be able to find all clients', async () => {
    const clientRepository = new InMemoryClientRepository()
    const findAll = new FindAllClients(clientRepository)

    Array.from({ length: 10 }).forEach(() => {
      clientRepository.create(makeClient())
    })

    const response = await findAll.execute()

    expect(response).toHaveLength(10)
  })
})
