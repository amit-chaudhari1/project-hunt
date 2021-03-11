import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

/**Every Passport strategy requires two things.
 * 1) A set of options that will be specific to the strategy that you are implementing
 * 2) A verify method which will tell PassportStrategy (pp from here on ;P )
 *    how to interact with the user store
 *
 * 1 is passed in to the strat using the super(constructor)
 * 2 is passed in by using the validate() method in the class
 */

@Injectable()
export class LocalStratergy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, passwordHash: string): Promise<any> {
    const user = await this.authService.ValidateUserCredentials({
      username,
      passwordHash,
    });
    return user;
  }
}
