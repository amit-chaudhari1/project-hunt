import {
  ExecutionContext,
  Injectable,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getRepository } from 'typeorm';
import { Session } from './../../entities/session.entity';

@Injectable()
export class SessionGuard extends AuthGuard('cookie') {
  async canActivate(context: ExecutionContext) {
    const reqCooki = context.switchToHttp().getRequest();
    //TODO: we will be recieving secure signed HTTP Only cookies.. refactor for that.
    const reqcoo = reqCooki.cookies['SessionID'];
    const sessionMatch = await getRepository(Session).findOne({
      where: { id: reqcoo },
    });

    if (!sessionMatch) {
      this.handleRequest(null);
    }
    return true;
  }

  //refactor and add err handling, problems for future amit
  handleRequest(user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (!user) {
      throw new UnauthorizedException();
      // Redirect('https:localhost:3000/login');
    }
    return user;
  }
}
