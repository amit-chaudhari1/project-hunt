import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/login')
  async login(username: string, passwordHash: string) {
    return this.appService.login(username, passwordHash);
  }
}
