import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'inspector';
import { getConnection } from 'typeorm';
import { AuthService } from './auth/auth.service';
import { loginUserDto } from './modules/users/loginUser.dto';
import { UserRepository } from './modules/users/user.repository';
import { UsersService } from './modules/users/users.service';

@Injectable()
export class AppService {
  @Inject(UsersService)
  private userService: UsersService;

  @Inject(AuthService)
  private authService: AuthService;

  getHello(): string {
    return 'Hello World!';
  }
  async login(loginUserDto: loginUserDto) {
    const validate = await this.authService.ValidateUserCredentials(
      loginUserDto,
    );
    if (validate) {
      const session = await this.userService.createUserSession(loginUserDto);
      return session.id;
    } else {
      return false;
    }
  }
}
