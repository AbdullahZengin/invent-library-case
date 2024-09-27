import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Borrow } from "./borrow";

@Entity("books")
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({
        default: null,
        name: "score_avg",
        type: "numeric",
        precision: 5,
        scale: 2,
        nullable: true,
    })
    score!: number;

    @OneToMany(() => Borrow, (borrow) => borrow.book)
    borrowedBooks!: Borrow[];
}
