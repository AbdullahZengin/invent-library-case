import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Book } from "./entities/book";
import { Borrow } from "./entities/borrow";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

if (!DB_HOST || !DB_PORT || !DB_USERNAME || !DB_PASSWORD || !DB_DATABASE) {
    console.error("Please set the environment variables");
    process.exit(1);
}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Book, Borrow],
    migrations: [],
    subscribers: [],
});
