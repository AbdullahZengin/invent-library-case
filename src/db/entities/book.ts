import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Borrow } from "./borrow";

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ default: -1, name: "score_avg" })
    scoreAvg!: number;

    @OneToMany(() => Borrow, (borrow) => borrow.book)
    borrowedBooks!: Borrow[];
}
