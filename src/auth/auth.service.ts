import { Injectable } from '@nestjs/common';
import { loginUserDto } from 'src/modules/users/loginUser.dto';
import { UserService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async ValidateUserCredentials(loginUserDto: loginUserDto): Promise<any> {
    const user = await this.userService.findUserByUsername(
      loginUserDto.username,
    );
    let passwdMatch = false;
    if (user) {
      passwdMatch = await bcrypt.compare(
        loginUserDto.passwordHash,
        user.password,
      );
    }

    if (user && passwdMatch) {
      const result = user;
      return result;
    }
    return null;
  }
  async ValidateSession(SessionID) {
    const user = await this.userService.getUserBySession(SessionID);
    return user;
  }
}
