import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { loginUserDto } from 'src/modules/users/loginUser.dto';

@Injectable()
export class AuthService {
  async ValidateUserCredentials(loginUserDto: loginUserDto): Promise<boolean> {
    //get the username or undefined if nothing mathces in the database...
    //TODO:Needs REfactoring
    const possibleUser = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .select(['user.password'])
      .where('username LIKE :username', { username: loginUserDto.username })
      .getOne();
    console.log('Current user should have Hash ' + possibleUser.password);
    console.log(
      'The password that needs to get hashed passed to me was' +
        loginUserDto.passwordHash,
    );
    const passwdMatch = await bcrypt.compare(
      loginUserDto.passwordHash,
      possibleUser.password,
    );
    console.log(passwdMatch);
    if (possibleUser && passwdMatch) {
      return true;
    } else {
      return false;
    }
  }
}
