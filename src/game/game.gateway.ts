import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { socketMiddleware } from '../socket/socket.middleware';
import { socketJwtMap } from '../socket/socket.middleware';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly gameService: GameService) {}

  afterInit(server: Server) {
    server.use(socketMiddleware);
  }

  @SubscribeMessage('getQuestion')
  async handleGetQuestion(client: Socket, payload: any) {
    
    
      await this.gameService.startGame();
    
    const question = await this.gameService.getNextQuestion();
    if (question) {
        this.server.to(client.id).emit('question', question);
      console.log('Sent question:', question.id);
    } else {
        this.server.to(client.id).emit('gameFinished', { message: 'Tebrikler, testi bitirdiniz!' });
      console.log('Game finished');
    }
  }

  @SubscribeMessage('submitAnswer')
  async handleSubmitAnswer(
    client: Socket,
    payload: { questionId: number; answer: string; currentScore: number },
  ) {
    const isCorrect = await this.gameService.validateAnswer(payload.questionId, payload.answer);
    let newScore = payload.currentScore;
    if (isCorrect) {
      newScore += 10;
      const userId = socketJwtMap.get(client.id);
      if (userId) {
        await this.gameService.updateHighScore(parseInt(userId), newScore);
      }
    }
    this.server.to(client.id).emit('answerResult', { isCorrect, newScore });
  }
}
