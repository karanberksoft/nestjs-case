import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { User } from '../users/user.entity';


function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

@Injectable()
export class GameService {
  private questionsQueue: Question[] = [];
  private gameStarted = false;

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async startGame(): Promise<void> {
    if (!this.gameStarted) {
      const allQuestions = await this.questionRepository.find();
      if (allQuestions.length === 0) {
        throw new Error('No questions available');
      }
     
      this.questionsQueue = shuffleArray(allQuestions);
      this.gameStarted = true;
    }
  }

  async getNextQuestion(): Promise<Question | undefined> {
    if (!this.gameStarted) {
      await this.startGame();
    }
    return this.questionsQueue.shift(); 
  }

  async validateAnswer(questionId: number, answer: string): Promise<boolean> {
    const question = await this.questionRepository.findOne({ where: { id: questionId } });
    if (!question) return false;
    return question.correctAnswer === answer;
  }
  async updateHighScore(userId: number, newHighScore: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    user.highScore = newHighScore;
    return this.usersRepository.save(user);
  }
}
