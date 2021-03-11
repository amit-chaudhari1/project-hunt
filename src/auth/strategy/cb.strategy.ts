import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oneauth';
import { AuthService } from '../auth.service';

@Injectable()
export class CBStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.CODINGBLOCKS_CLIENT_ID,
      clientSecret: process.env.CODINGBLOCKS_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/coding-blocks/callback',
    });
  }
  async validate() {
    return;
  }
}
