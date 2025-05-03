import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../role.enum';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
