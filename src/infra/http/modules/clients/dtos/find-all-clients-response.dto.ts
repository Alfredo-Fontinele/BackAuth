import { ApiProperty } from '@nestjs/swagger'

export class FindAllClientsDTOResponse200 {
  @ApiProperty({
    description: 'id',
    example: 'd73d4f51-9803-466e-aa29-cef24cd6f6e',
  })
  id: string

  @ApiProperty({
    example: 'Razy Igarashi',
  })
  name: string

  @ApiProperty({
    description: 'email must be valid',
    example: 'razy@gmail.com',
  })
  email: string

  @ApiProperty({
    description: 'created_at',
    example: '2023-12-24T14:03:44.793Z',
  })
  created_at: string
}
