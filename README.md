Bookstore REST API
A simple RESTful API built with Node.js and Express that manages user registration, login, and book CRUD operations. Data is persisted in JSON files. Authentication is handled using JWT, and routes are protected to ensure users can only manage their own books.

Features:
File-based data persistence (users.json, books.json)
JWT-based authentication
Full CRUD for books
Only the user who created a book can update/delete it
Book filtering by genre + pagination
Middleware for logging, authentication, and error handling

Setup Instructions
1. Clone the Repository
git clone https://github.com/UjjwalCodes-afk/Bookstore-REST-API-with-File-Based-Persistence-and-Authentication.git
2. Install Dependencies
npm install
3. Set Up Environment Variables
Create a .env file in the root directory:

env
PORT=8000
JWT_SECRET= mysecretkey    //or any string 


4. Run the Server
npm start
The server should start on http://localhost:8000.

How to Test Endpoints (via Postman)
Base URL:
http://localhost:8000
Auth Endpoints
Register
POST /auth/register
Body (JSON):
{
  "email": "user@example.com",
  "password": "securepass"
}
Login
POST /auth/login
Body (JSON):
{
  "email": "user@example.com",
  "password": "securepass"
}
Response:
{
  "token": "your-jwt-token"
}
Use this token in the Authorization header for all /books routes:


Authorization: Bearer your-jwt-token

Book Endpoints (Require Auth)
Add Book

POST /books

{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "publishedYear": "1937"
}
Get All Books (with Pagination & Genre Filter)
GET /books?page=1&limit=5&genre=fantasy
Get Book by ID

GET /books/:id
✏️ Update Book

PUT /books/:id

{
  "title": "The Hobbit: Revised Edition"
}
Delete Book

DELETE /books/:id

🧰 Tech Stack
Node.js
Express.js
JWT (jsonwebtoken)
Argon2 (for password hashing)
fs/promises for file-based storage

📂 Project Structure
├── controllers/
│   ├── authController.js
│   └── bookController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── notFound.js
├── routes/
│   ├── authRoute.js
│   └── bookRoutes.js
├── services/
│   └── fileStore.js
├── data/
│   ├── users.json
│   └── books.json
├── .env
├── index.js
├── package.json
└── README.md
