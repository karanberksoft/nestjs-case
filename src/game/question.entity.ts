import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  
  @Column('text', { array: true })
  options: string[];

  @Column()
  correctAnswer: string;
}
