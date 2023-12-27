import { Client } from '@application/entities/client.entity'
import { BadRequestException } from '@nestjs/common'
import { InMemoryClientRepository } from '@test/repositories/clients/in-memory-clients.repository'
import { CreateClient } from './create-client'

describe('Create Client Case', () => {
  const clientRepository = new InMemoryClientRepository()
  const createClient = new CreateClient(clientRepository)

  it('should be able to create a client', async () => {
    await createClient.execute({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '@abcAB12',
      confirm_password: '@abcAB12',
    })

    expect(clientRepository.clients).toHaveLength(1)
    expect(clientRepository.clients[0]).toBeInstanceOf(Client)
  })

  it('should not be able to create a client with password and confirm_password differents', async () => {
    expect(async () => {
      await createClient.execute({
        name: 'teste',
        email: 'teste@gmail.com',
        password: '@abcAB12',
        confirm_password: '@abcAB11',
      })
    }).rejects.toThrow(BadRequestException)
  })

  it('should not be able to create a client with invalid password', async () => {
    expect(async () => {
      await createClient.execute({
        name: 'teste',
        email: 'teste@gmail.com',
        password: 'teste',
        confirm_password: 'teste',
      })
    }).rejects.toThrow(BadRequestException)
  })
})
