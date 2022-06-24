import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signPayload(payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  async validateUser(payload) {
    return await this.usersService.findByPayload(payload);
  }
}
