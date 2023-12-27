import { ApiProperty } from '@nestjs/swagger'

export class SignInDTOResponse200 {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNzU4OTcxOC0yMjE5LTQyYmYtYWMyMC1mNWI0NzY4MmNmNWEiLCJlbWFpbCI6Im5ldG9AZ21haWwuY29tIiwiaWF0IjoxNzAzMzY0NjU2LCJleHAiOjE3MDMzNjgyNTZ9.FRfbgS5v48yKYPLKYb3L_jbVgVBstMJVfWzV1IIVFhg',
  })
  access_token: string
}

export class SignInDTOResponse401 {
  @ApiProperty({
    example: 'client not authenticated',
    description: 'message error from server',
  })
  message: string

  @ApiProperty({
    example: 'Unauthorized',
    description: 'message error from server',
  })
  error: string

  @ApiProperty({
    example: 401,
    description: 'status code response',
  })
  statusCode: number
}
