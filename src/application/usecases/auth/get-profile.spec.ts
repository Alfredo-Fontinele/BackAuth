import { Client } from '@application/entities/client.entity'
import { jwtService } from '@helpers/jwt-service'
import { makeClient } from '@test/factories/make-client.factory'
import { InMemoryClientRepository } from '@test/repositories/clients/in-memory-clients.repository'
import { GetProfile } from './get-profile'
import { SignIn } from './sign-in'

describe('Get Profile Case', () => {
  it('should be able to get profile from client after login', async () => {
    const clientRepository = new InMemoryClientRepository()

    const getProfile = new GetProfile(jwtService, clientRepository)
    const signIn = new SignIn(jwtService, clientRepository)

    const client = makeClient()
    await clientRepository.create(client)

    const responseSignIn = await signIn.execute({
      email: client.props.email,
      password: client.props.password,
    })

    const responseGetProfile = await getProfile.execute({
      authorization: `Bearer ${responseSignIn.access_token}`,
    })

    expect(responseGetProfile).toBeInstanceOf(Client)
  })
})
