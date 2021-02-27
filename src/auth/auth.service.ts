import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async ValidateUser(user: {
    username: string;
    passwordHash: string;
  }): Promise<boolean> {
    //get the username or undefined if nothing mathces in the database...
    const possibleUser = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .select(['user.password'])
      .where('username LIKE :username', { username: user.username })
      .getOne();
    console.log('Current user should have Hash ' + possibleUser.password);
    console.log('The hash that was passed to me was' + user.passwordHash);
    const passwdMatch = await bcrypt.compare(
      user.passwordHash,
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
