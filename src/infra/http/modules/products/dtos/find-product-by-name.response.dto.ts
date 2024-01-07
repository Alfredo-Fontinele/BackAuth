import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class FindProductByNameResponse200_DTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name must be string',
    example: 'Notebook Gamer',
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'description must be string',
    example: 'Produto muito bom!',
  })
  description: string

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'quantity must be number',
    example: 10,
  })
  quantity: number

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description:
      'price must be number. Ex: R$10.000,00 => 1000000. Ex: US$10.000,00 => 1000000',
    example: 10000,
  })
  price: number
}

export class FindProductByNameResponse404_DTO {
  @ApiProperty({
    example: 'product not found by name',
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
