import { IsString } from 'class-validator';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

export class UserDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
  _id: string;
  role: Roles;
  sub?: string;
}
