import { ApiProperty } from '@nestjs/swagger'

export class FindProductByIdRequest_DTO {
  @ApiProperty({
    example: 'd73d4f51-9803-466e-aa29-cef24cd6f6e',
    description: 'client id',
  })
  id: string
}
