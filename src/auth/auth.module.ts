import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './auth.service';
import { LocalStratergy } from './strategy/local.strategy';
import { GithubStrategy } from './strategy/github.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { CBStrategy } from './strategy/cb.strategy';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/modules/users/user.repository';
import { UserService } from 'src/modules/users/users.service';
import { SessionStrategy } from './strategy/session.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [
    AuthService,
    LocalStratergy,
    GithubStrategy,
    GoogleStrategy,
    SessionStrategy,
    CBStrategy,
    UserService,
    UserRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
