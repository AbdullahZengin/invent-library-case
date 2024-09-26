export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public stack?: string
    ) {
        super(message);

        if (!stack) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
