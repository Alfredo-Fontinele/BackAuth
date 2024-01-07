import { Client, ClientProps } from '@application/entities/client.entity'

type MakeClientProps = Partial<ClientProps>

export const makeClient = (client: MakeClientProps = {}) => {
  return new Client({
    name: 'Galileu',
    email: 'galileu@gmail.com',
    password: 'galileu123',
    ...client,
  })
}
