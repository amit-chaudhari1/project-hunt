import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStratergy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); //we can pass an options object to super to customise the stratergy behaviour
  }
  async validate(username: string, passwordHash: string): Promise<any> {
    console.trace('here we are');
    const user = await this.authService.ValidateUserCredentials({
      username,
      passwordHash,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
