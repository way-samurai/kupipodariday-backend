import { Controller, Body, Req, UseGuards, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalGuardGuard } from './guards/local-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalGuardGuard)
  @Post('signin')
  async signin(@Req() req: Request & { user: User }) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { about, ...rest } = createUserDto;
    const userDto = (about !== '' ? createUserDto : rest) as CreateUserDto;

    const user = await this.usersService.create(userDto);
    this.authService.auth(user);

    return user;
  }
}
