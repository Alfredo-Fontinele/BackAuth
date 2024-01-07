import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class FindAllProducts200_DTO {
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
