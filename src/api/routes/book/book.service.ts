import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../../common/utils/errors/api.error";
import { AppDataSource } from "../../../db/data-source";
import { Book } from "../../../db/entities/book";

/**
 * Service class for book related operations.
 */
class BookService {
    /**
     * Get all books.
     *
     * @returns All books.
     */
    async getAll() {
        const data = await AppDataSource.getRepository(Book).find({
            select: ["id", "name"],
            order: { name: "ASC" },
        });

        return data;
    }

    /**
     * Get a book by ID with score.
     *
     * @param id - Book ID.
     * @returns Book data with score. if score is null, it will be -1.
     * @throws ApiError when book is not found.
     */
    async getByIdWithScore(id: number) {
        const book = await AppDataSource.getRepository(Book).findOne({
            where: { id },
            select: ["id", "name", "score"],
        });

        if (!book) throw new ApiError(StatusCodes.NOT_FOUND, "Book not found");

        return { id: book.id, name: book.name, score: book.score || -1 };
    }

    /**
     * Create a book.
     *
     * @param name - Book name.
     */
    async create(name: string) {
        await AppDataSource.getRepository(Book).insert({ name });
    }
}

export default new BookService();
