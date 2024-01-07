import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class FindProductByNameRequest_DTO {
  @ApiProperty({
    example: 'notebook',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
