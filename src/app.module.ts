// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { GameModule } from './game/game.module';
import { Question } from './game/question.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',       
      port: 5432,
      username: 'berkkuthan',    
      password: '1q2w3e4r5t',    
      database: 'nestauth',    
      entities: [User,Question],
      synchronize: true,      
    }),
    AuthModule,
    UsersModule,
    GameModule
  ],
})
export class AppModule {}
