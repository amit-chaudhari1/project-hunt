import { Body, Controller, Get, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { loginUserDto } from './modules/users/loginUser.dto';

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
  async login(@Body() loginUserDto: loginUserDto, @Res() res: Response) {
    const token = await this.appService.login(loginUserDto);
    console.log('current TOken is' + token);
    if (!token) {
      return 'invalid username or password';
    } else {
      res.set('Authorization', 'Bearer ' + token);
      //set expire to match the session entities expire
      res.cookie('SessionID', token, { maxAge: 90000, httpOnly: true });
      res.send({
        success: true,
        token,
      });
    }
  }
}
