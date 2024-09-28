# Invent Library Case - REST API

## Project Description

This project is designed as a REST API for developing a library management application. The application manages members and books, allowing users to borrow books, return them, and rate them. This API performs the following functions:

-   Listing users
-   Accessing information about a user (name, books borrowed in the past and their scores, currently borrowed books)
-   Creating a new user
-   Listing books
-   Accessing information about a book (name and average rating)
-   Creating a new book
-   Borrowing a book
-   Returning a book and giving a rating

The project is developed in accordance with the requirements specified for the Invent Analytics Backend Developer Case using Node.js with Express.js and TypeScript.

## Technologies Used

-   **Node.js**: Server-side runtime environment.
-   **Express.js**: Web framework used to create the REST API.
-   **TypeScript**: Programming language.
-   **PostgreSQL**: Database.
-   **TypeORM**: ORM used for database operations.
-   **Joi**: Validation library for API request inputs.
-   **Memory Cache**: Simple memory caching.
-   **Morgan**: Logger.

## Installation and Running

### Required Dependencies

First, install the necessary packages to run the project by using the following command:

```
npm install
```

### Database Setup

The project uses PostgreSQL as the database. Before running the project, copy the environment variables from the `.env.sample` file to a `.env` file and update the PostgreSQL connection information. Then, execute the SQL file in the root directory to create the database schema.

```
psql -U <username> -d <database_name> -f invent_library_case_db_ddl.sql
```

### Development Environment

You can start the project in the development environment using the following command:

```
npm run dev
```

### Build and Production Environment

To build the project and run it in the production environment, you can use the following commands:

```
npm run build
npm run start
```

## API Usage

The API endpoints and usage examples are provided along with the Postman Collection. The following basic functions can be used via the REST API:

-   GET `/users`: Listing users
-   GET `/users/:id`: Accessing a specific user's information
-   POST `/users`: Creating a new user
-   GET `/books`: Listing books
-   GET `/books/:id`: Accessing information about a specific book
-   POST `/books`: Creating a new book
-   POST `/users/:userId/borrow/:bookId`: Borrowing a book
-   POST `/users/:userId/return/:bookId`: Returning a book and giving a rating

## Environment Variables

The `.env` file should contain the following environment variables:

```
NODE_ENV=<environment>
PORT=<port>
DB_HOST=<your_db_host>
DB_PORT=<your_db_port>
DB_USERNAME=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_DATABASE=<your_db_name>
```

## Logger and Error Handling

The project utilizes **Morgan** as a simple logger. Additionally, potential errors in API requests (e.g., attempting to borrow a book by a non-existing user) are appropriately handled, returning suitable error codes in the API responses.

## License

This project is developed specifically for the Invent Analytics Backend Developer Case and is not licensed.
