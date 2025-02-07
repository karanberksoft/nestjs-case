import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Get('login')
  @Render('login')
  loginPage() {
    return {};
  }

  
  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return res.redirect('/login?error=Invalid credentials');
    }
    const token = (await this.authService.login(user)).access_token;
    
    res.cookie('jwt', token, { httpOnly: true });
    return res.redirect('/dashboard');
  }
}
