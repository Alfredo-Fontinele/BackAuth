import { DecodeTokenResponse, jwtService } from '@helpers/jwt-service'
import { UnauthorizedException } from '@nestjs/common'
import { makeClient } from '@test/factories/make-client.factory'
import { InMemoryClientRepository } from '@test/repositories/in-memory-clients.repository'
import { SignIn } from './sign-in'

describe('SingIn Case', () => {
  const clientRepository = new InMemoryClientRepository()
  const singIn = new SignIn(jwtService, clientRepository)

  it('should be able to client make sing in', async () => {
    const client = makeClient()
    await clientRepository.create(client)

    const response = await singIn.execute({
      email: client.props.email,
      password: client.props.password,
    })

    const decodeToken: DecodeTokenResponse = jwtService.decode(
      response.access_token,
    )

    const isIdDecodedTokenEqualIdClient = decodeToken.sub === client.id
    expect(isIdDecodedTokenEqualIdClient).toBeTruthy()
  })

  it('should not be able to client make sing in unexist in system', async () => {
    expect(
      async () =>
        await singIn.execute({
          email: 'fake@gmail.com',
          password: 'fakepassword',
        }),
    ).rejects.toThrow(UnauthorizedException)
  })
})
