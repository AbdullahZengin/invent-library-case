import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./user";
import { Book } from "./book";

@Entity("borrows")
export class Borrow {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true, default: null })
    score!: number;

    @Column("date", { name: "return_date", nullable: true, default: null })
    returnDate!: Date;

    @Column({ name: "user_id" })
    userId!: number;

    @ManyToOne(() => User, (user) => user.borrowedBooks)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ name: "book_id" })
    bookId!: number;

    @ManyToOne(() => Book, (book) => book.borrowedBooks)
    @JoinColumn({ name: "book_id" })
    book!: Book;
}
