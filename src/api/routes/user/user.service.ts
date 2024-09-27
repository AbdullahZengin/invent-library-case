import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../../common/utils/errors/api.error";
import { AppDataSource } from "../../../db/data-source";
import { Borrow } from "../../../db/entities/borrow";
import { User } from "../../../db/entities/user";
import { Book } from "../../../db/entities/book";

/**
 * Service class for user related operations.
 */
class UserService {
    /**
     * Get all users.
     *
     * @returns All users.
     */
    async getAll() {
        const data = await AppDataSource.getRepository(User).find({
            order: { name: "ASC" },
        });

        return data;
    }

    /**
     * Get a user by ID.
     *
     * @param id - User ID.
     * @returns User data.
     * @throws ApiError when user is not found.
     */
    async getById(id: number) {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id },
        });

        if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found");

        const data = await AppDataSource.getRepository(Borrow).find({
            where: { userId: id },
            relations: ["book"],
        });

        return {
            id: user.id,
            name: user.name,
            books: {
                past: data
                    .filter((borrow) => borrow.returnDate !== null)
                    .map((borrow) => {
                        return {
                            name: borrow.book.name,
                            userScore: borrow.score,
                        };
                    }),
                present: data
                    .filter((borrow) => borrow.returnDate === null)
                    .map((borrow) => {
                        return {
                            name: borrow.book.name,
                        };
                    }),
            },
        };
    }

    /**
     * Create a user.
     *
     * @param name - User name.
     */
    async create(name: string) {
        await AppDataSource.getRepository(User).insert({ name });
    }

    /**
     * Borrow a book for a user.
     *
     * @param userId - User ID.
     * @param bookId - Book ID.
     *
     * @throws ApiError - 404 Not Found - User not found.
     * @throws ApiError - 404 Not Found - Book not found.
     * @throws ApiError - 409 Conflict - Book is already borrowed.
     *
     */
    async borrowBook(userId: number, bookId: number): Promise<void> {
        const isUserExist = await this.isUserExist(userId);
        if (!isUserExist) {
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
        }

        const isBookExist = await this.isBookExists(bookId);
        if (!isBookExist) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Book not found");
        }

        const isBookBorrowed = await this.isBookBorrowed(bookId);
        if (isBookBorrowed) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                "Book is already borrowed"
            );
        }

        await AppDataSource.getRepository(Borrow).insert({ userId, bookId });
    }

    /**
     * Return a book with a score for a user.
     *
     * @param userId - User ID.
     * @param bookId - Book ID.
     * @param score - Score for the book.
     *
     * @throws ApiError - 404 Not Found - User not found.
     * @throws ApiError - 404 Not Found - Book not found.
     * @throws ApiError - 404 Not Found - Book is not borrowed by user.
     * @throws ApiError - 409 Conflict - User has already scored the book.
     * @throws ApiError - 400 Bad Request - Score is required.
     *
     */
    async returnBook(
        userId: number,
        bookId: number,
        score: number
    ): Promise<void> {
        const isUserExist = await this.isUserExist(userId);
        if (!isUserExist) {
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
        }

        const isBookExist = await this.isBookExists(bookId);
        if (!isBookExist) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Book not found");
        }

        const isBookBorrowedByUser = await this.isBookBorrowedByUser(
            userId,
            bookId
        );
        if (!isBookBorrowedByUser) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Book is not borrowed by user"
            );
        }

        const isUserAlreadyScoredBook = await this.isUserAlreadyScoredBook(
            userId,
            bookId
        );
        if (isUserAlreadyScoredBook && score) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                "User has already scored the book"
            );
        }

        if (!isUserAlreadyScoredBook && !score) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Score is required");
        }

        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager
                .createQueryBuilder()
                .update(Borrow)
                .set({ returnDate: new Date().toUTCString(), score })
                .where("user_id = :userId", { userId })
                .andWhere("book_id = :bookId", { bookId })
                .execute();

            if (!!score) {
                const calculatedScore = await this.recalculateBookScore(
                    bookId,
                    score
                );

                await queryRunner.manager
                    .createQueryBuilder()
                    .update(Book)
                    .set({ score: calculatedScore })
                    .where("id = :bookId", { bookId })
                    .execute();
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * Check if a book is borrowed.
     *
     * @param bookId - Book ID.
     * @returns True if the book is borrowed, false otherwise.
     */
    async isBookBorrowed(bookId: number): Promise<boolean> {
        const borrowedBook = await AppDataSource.getRepository(Borrow)
            .createQueryBuilder("borrows")
            .where("book_id = :bookId", { bookId })
            .andWhere("return_date IS NULL")
            .getOne();

        return !!borrowedBook;
    }

    /**
     * Check if a book is borrowed by a user.
     *
     * @param userId - User ID.
     * @param bookId - Book ID.
     * @returns True if the book is borrowed by the user, false otherwise.
     */
    async isBookBorrowedByUser(
        userId: number,
        bookId: number
    ): Promise<boolean> {
        const borrowedBook = await AppDataSource.getRepository(Borrow)
            .createQueryBuilder("borrows")
            .where("book_id = :bookId", { bookId })
            .andWhere("user_id = :userId", { userId })
            .andWhere("return_date IS NULL")
            .getOne();

        return !!borrowedBook;
    }

    /**
     * Check if a user has already scored a book.
     *
     * @param userId - User ID.
     * @param bookId - Book ID.
     * @returns True if the user has already scored the book, false otherwise.
     */
    async isUserAlreadyScoredBook(
        userId: number,
        bookId: number
    ): Promise<boolean> {
        const borrowedBook = await AppDataSource.getRepository(Borrow)
            .createQueryBuilder("borrows")
            .where("book_id = :bookId", { bookId })
            .andWhere("user_id = :userId", { userId })
            .andWhere("score IS NOT NULL")
            .getOne();

        return !!borrowedBook;
    }

    /**
     * Check if a user exists.
     *
     * @param userId - User ID.
     * @returns True if the user exists, false otherwise.
     */
    async isUserExist(userId: number): Promise<boolean> {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: userId },
        });

        return !!user;
    }

    /**
     * Check if a book exists.
     *
     * @param id - Book ID.
     * @returns True if the book exists, false otherwise.
     */
    async isBookExists(id: number) {
        const book = await AppDataSource.getRepository(Book).findOne({
            where: { id },
        });

        return !!book;
    }

    /**
     * Recalculate the score of a book.
     *
     * @param bookId - Book ID.
     * @returns The recalculated score. If there is no score, it will return -1.
     */
    async recalculateBookScore(
        bookId: number,
        newScore: number
    ): Promise<number> {
        const result = await AppDataSource.getRepository(Borrow)
            .createQueryBuilder("borrows")
            .select([
                'COUNT(score)::int as "totalVotes"',
                'SUM(score)::int as "totalScore"',
            ])
            .where("book_id = :bookId", { bookId })
            .andWhere("score IS NOT NULL")
            .getRawOne<{ totalVotes: number; totalScore: number }>();

        if (!result || result?.totalVotes === 0) {
            return newScore;
        }

        return parseFloat(
            ((result.totalScore + newScore) / (result.totalVotes + 1)).toFixed(
                2
            )
        );
    }
}

export default new UserService();
