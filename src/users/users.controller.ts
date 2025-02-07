import { Controller, Get, Post, Render, Body, Res, Req, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('register')
  @Render('register')
  registerPage() {
    return {};
  }

  @Post('register')
  async register(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    await this.usersService.create(body);
    return res.redirect('/login');
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @Render('dashboard')
  dashboard(@Req() req: Request) {
    return { user: req['user'] };
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    return res.redirect('/login');
  }
}
