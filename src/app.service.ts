import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async login(username: string, passwordHash: string) {
    const validate = await this.authService.ValidateUser({
      username,
      passwordHash,
    });
    if (validate) {
      // TODO:
      // check for conditions for a valid cookie which are :
      // it should one on one relation for that user and him only.
      // should have expires on in future.
      // no? assign a new session
      // send it ina cookie...
      // yes? send it as a cookie to this user...
      // and refresh its expiration to seven days forward?
    } else {
      //TODO: how do i send a message that says "username or password was incorrect"
      return { url: 'https:localhost:3000/login' };
    }
  }
}
