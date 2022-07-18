import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserDTO } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDTO: UserDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const token = await this.authService.signPayload({
      username: user.username,
    });

    return { token, username: user.username, id: user._id };
  }
  @Post('registration')
  async register(@Body() registerDTO: UserDTO) {
    const user = await this.userService.create(registerDTO);
    const token = await this.authService.signPayload({
      username: user.username,
    });

    return { token, username: user.username, id: user._id };
  }
}
