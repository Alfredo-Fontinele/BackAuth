import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateClientDTORequest {
  @ApiProperty({
    description: 'name must be valid',
    example: 'Razy Igarashi',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'email must be valid',
    example: 'razy@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description:
      'password must be at least 8 characters long, containing letters, numbers, and at least one symbol',
    example: '@@abcAB12',
  })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({
    description: 'confirm_password must be equal password',
    example: '@@abcAB12',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string
}
