import { Client, ClientProps } from '@application/entities/client.entity'

type MakeClient = Partial<ClientProps>

export const makeClient = (client: MakeClient = {}) => {
  return new Client({
    name: 'Galileu',
    email: 'galileu@gmail.com',
    password: 'galileu123',
    ...client,
  })
}
