import { ApiProperty } from '@nestjs/swagger'

export class FindClientDTOResponse200 {
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

export class FindClientDTOResponse404 {
  @ApiProperty({
    example: 'client not found by id',
    description: 'message error from server',
  })
  message: string

  @ApiProperty({
    example: 'Not Found',
    description: 'message error from server',
  })
  error: string

  @ApiProperty({
    example: 404,
    description: 'status code response',
  })
  statusCode: number
}
