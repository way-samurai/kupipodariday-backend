import { Injectable } from '@nestjs/common';
//import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  //constructor() {}

  auth(user: User) {
    return 'генерируем токен';
  }
}
