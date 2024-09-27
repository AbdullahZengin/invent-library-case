import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { Borrow } from "./borrow";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Borrow, (borrow) => borrow.book)
    @JoinColumn({ name: "user_id" })
    borrowedBooks!: Borrow[];
}
