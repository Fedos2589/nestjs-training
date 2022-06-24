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
  async login(@Body() LoginDTO: UserDTO) {
    const user = await this.userService.findByLogin(LoginDTO);
    const token = await this.authService.signPayload({
      username: user.username,
    });

    return { token, username: user.username, id: user._id };
  }
  @Post('registration')
  async register(@Body() RegisterDTO: UserDTO) {
    const user = await this.userService.create(RegisterDTO);
    const token = await this.authService.signPayload({
      username: user.username,
    });

    return { token, username: user.username, id: user._id };
  }
}
