import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'inspector';
import { getConnection } from 'typeorm';
import { AuthService } from './auth/auth.service';
import { loginUserDto } from './modules/users/loginUser.dto';
import { UserRepository } from './modules/users/user.repository';
import { UserService } from './modules/users/users.service';

@Injectable()
export class AppService {
  @Inject(UserService)
  private userService: UserService;

  @Inject(AuthService)
  private authService: AuthService;

  getHello(): string {
    return 'Hello World!';
  }

  async login(loginUserDto: loginUserDto) {
    const session = await this.userService.createUserSession(loginUserDto);
    return session.id;
  }
}
