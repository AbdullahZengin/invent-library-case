# Invent Library Case - REST API

## Project Description

This project is designed as a REST API for developing a library management application. The application manages members and books, allowing users to borrow books, return them, and rate them. This API performs the following functions:

- Listing users
- Accessing information about a user (name, books borrowed in the past and their scores, currently borrowed books)
- Creating a new user
- Listing books
- Accessing information about a book (name and average rating)
- Creating a new book
- Borrowing a book
- Returning a book and giving a rating

The project is developed in accordance with the requirements specified for the Invent Analytics Backend Developer Case using Node.js with Express.js and TypeScript.

## Technologies Used

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework used to create the REST API.
- **TypeScript**: Programming language.
- **PostgreSQL**: Database.
- **TypeORM**: ORM used for database operations.
- **Joi**: Validation library for API request bodies.
- **Memory Cache**: Simple memory caching.
- **Morgan**: Logger.

## Installation and Running

### Required Dependencies

First, install the necessary packages to run the project by using the following command:

```bash
npm install
