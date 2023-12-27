import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignInRequestDTO {
  @ApiProperty({
    description: 'email must be valid',
    example: 'fake@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description:
      'password must be at least 8 characters long, including 2 special characters, 2 numbers, and 2 uppercase letters.',
    example: '@@abcAB12',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
