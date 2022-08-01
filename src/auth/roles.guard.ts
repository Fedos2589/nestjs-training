import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/users/dto/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<Roles>('role', context.getHandler());
    if (!role) {
      throw new HttpException('Role is not specified', HttpStatus.UNAUTHORIZED);
    }

    const { user } = context.switchToHttp().getRequest();

    return user.role === role;
  }
}
