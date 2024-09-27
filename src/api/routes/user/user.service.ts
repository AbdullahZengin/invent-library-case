import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../../common/utils/errors/api.error";
import { AppDataSource } from "../../../db/data-source";
import { Borrow } from "../../../db/entities/borrow";
import { User } from "../../../db/entities/user";

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
}

export default new UserService();
