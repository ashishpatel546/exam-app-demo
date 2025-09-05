import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exam } from "./exam.entity";
import { Questions } from "./questions.entity";

export enum UserRole{
    user = 'user',
    admin = 'admin'

}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id: number;

    @CreateDateColumn()
    created_on: Date

    @UpdateDateColumn()
    updated_on: Date


    @Column({unique: true})
    email: string

    @Column({unique: true})
    name: string

    @Column({
        type: "enum",
        enum: UserRole
    })
    role: string

    @OneToMany(() => Exam, (exam) => exam.created_by)
    exam: Exam[]

    @OneToMany(() => Questions, (quesion) => quesion.created_by)
    question: Questions[]
}