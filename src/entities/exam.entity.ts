import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Questions } from './questions.entity';
import { User } from './user.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_on: string;

  @UpdateDateColumn()
  updated_on: Date;

  @Column()
  exam_name: string;


  @Column()
  total_question: number;

  @Column()
  question_in_exam: number;

  @Column({ type: 'float' })
  passing_percentage: number;

  @Column()
  exam_date: Date;

  @OneToMany(type => Questions, question => question.exam)
  questions?: Questions[]

  @ManyToOne(() => User, (user) => user.exam)
  created_by: User
}
