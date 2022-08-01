import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles, UserDTO } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('registration')
  async register(@Body() registerDTO: UserDTO) {
    const user = await this.userService.create(registerDTO);
    const token = await this.authService.signPayload({
      username: user.username,
    });

    return { token, username: user.username, id: user._id };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  @SetMetadata('role', Roles.ADMIN)
  findAll() {
    return this.userService.findAll();
  }
}
