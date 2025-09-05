import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exam } from './exam.entity';
import { User } from './user.entity';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_on: string;

  @UpdateDateColumn()
  updated_on: Date;

  @Column()
  description: string;

  @Column()
  is_multiselect: boolean;

  @Column("simple-array")
  options: string[]

  @Column("simple-array")
  answer: string[]

  @ManyToOne(() => Exam, (exam) => exam.questions)
    exam: Exam

  @ManyToOne(() => User, (user) => user.question)
  created_by: User

}
