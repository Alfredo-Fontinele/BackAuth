import { ApiProperty } from '@nestjs/swagger'

export class CreateClientResponse201_DTO {
  @ApiProperty({
    example: 'd73d4f51-9803-466e-aa29-cef24cd6f6e',
  })
  id: string

  @ApiProperty({
    example: 'Razy Igarashi',
  })
  name: string

  @ApiProperty({
    example: 'razy@gmail.com',
  })
  email: string

  @ApiProperty({
    example: '2023-12-24T14:03:44.793Z',
  })
  created_at: string
}
