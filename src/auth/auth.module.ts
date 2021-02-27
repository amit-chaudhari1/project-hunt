import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './auth.service';
import { LocalStratergy } from './local.stratergy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStratergy],
})
export class AuthModule {}
