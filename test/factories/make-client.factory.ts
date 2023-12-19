import { Client } from '@application/entities/client.entity'

type MakeClient = Partial<Client>

export const makeClient = (props: MakeClient = {}) => {
  return new Client({
    name: 'Galileu',
    email: 'galileu@gmail.com',
    password: 'galileu123',
    ...props,
  })
}
