import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['admin', 'editor', 'viewer'])
  role: string;
}
