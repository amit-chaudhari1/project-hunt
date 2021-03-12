import {
  Controller,
  Get,
  Inject,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CBAuthGuard } from './guards/cb-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
// import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @UseGuards(GithubAuthGuard)
  @Get('/github')
  async SigninWithGithub() {
    return;
  }

  @Get('github/callback')
  async SigninWithGithubCallback(@Req() req) {
    return 'yay';
    //redirect to home page where we get the hello world. or user profile page .
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async SigninWithGoogle() {
    return;
  }

  @Get('google/callback')
  async SigninWithGoogleCallback(@Req() req) {
    console.log(req);
    return 'yay';
    //redirect to home page where we get the hello world. or user profile page .
  }

  @UseGuards(CBAuthGuard)
  @Get('/coding-blocs')
  async SigninWithCodingBlocks() {
    return;
  }

  @Get('coding-blocks/callback')
  async SigninWithCodingBlocksCallback(@Req() req) {
    console.log(req);
    return 'yay';
    //redirect to home page where we get the hello world. or user profile page .
  }
}
