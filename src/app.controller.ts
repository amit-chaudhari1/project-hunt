import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { SessionGuard } from './auth/guards/session.guard';

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

  @UseGuards(SessionGuard)
  @Get('/testguard')
  SecretHello(): string {
    return "THis is a secret hello. you should not be able to see this if you don't have a valid session";
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res() res) {
    const token = await this.appService.login(req);
    res.set('Authorization', 'Bearer ' + token);
    //set expire to match the session entities expire
    res.cookie('SessionID', token, { maxAge: 90000, httpOnly: true });
    res.send({
      token,
    });
  }
}
