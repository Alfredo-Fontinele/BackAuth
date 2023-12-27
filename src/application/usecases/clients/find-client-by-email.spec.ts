import { Client } from '@application/entities/client.entity'
import { makeClient } from '@test/factories/make-client.factory'
import { InMemoryClientRepository } from '@test/repositories/clients/in-memory-clients.repository'
import { FindClientByEmail } from './find-client-by-email'

describe('Find Client By Email Case', () => {
  it('should be able to find a client by email', async () => {
    const clientRepository = new InMemoryClientRepository()
    const findClientByEmail = new FindClientByEmail(clientRepository)

    const client = makeClient()

    await clientRepository.create(client)

    const response = await findClientByEmail.execute({
      email: client.props.email,
    })

    expect(response).toBeInstanceOf(Client)
  })
})
