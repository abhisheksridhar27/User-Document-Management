import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
