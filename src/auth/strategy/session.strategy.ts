import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-cookie';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ cookieName: 'SessionID', passReqToCallback: true });
  }
  async validate(cookie) {
    console.log(cookie);
    const result = this.authService.ValidateSession(cookie);
    return result;
  }
}
