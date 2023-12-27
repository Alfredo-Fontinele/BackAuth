import { makeClient } from '@test/factories/make-client.factory'
import { InMemoryClientRepository } from '@test/repositories/clients/in-memory-clients.repository'
import { FindAllClients } from './find-all'

describe('Find All Clients Case', () => {
  it('should be able to find a unique client', async () => {
    const clientRepository = new InMemoryClientRepository()
    const findAll = new FindAllClients(clientRepository)

    await clientRepository.create(makeClient())
    await clientRepository.create(makeClient())
    await clientRepository.create(makeClient())

    const response = await findAll.execute()
    expect(response).toHaveLength(1)
  })

  it('should be able to find all clients', async () => {
    const clientRepository = new InMemoryClientRepository()
    const findAll = new FindAllClients(clientRepository)

    await clientRepository.create(makeClient({ email: 'fake-1@gmail.com' }))
    await clientRepository.create(makeClient({ email: 'fake-2@gmail.com' }))
    await clientRepository.create(makeClient({ email: 'fake-3@gmail.com' }))

    const response = await findAll.execute()
    expect(response).toHaveLength(3)
  })
})
