import { IsString, Length, IsEmail, IsUrl, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @Length(2, 200)
  @IsOptional()
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
