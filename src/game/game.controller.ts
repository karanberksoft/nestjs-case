import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class GameController {
  @Get("/game")
  @Render('game')
  root() {
    return { title: 'Education Game' };
  }
}
