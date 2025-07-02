# Task Manager API 📋

A RESTful API for managing personal tasks with JWT-based authentication, built with Node.js, Express, and MongoDB. Documented with Swagger for easy exploration and testing.

---

## 📖 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Server](#-running-the-server)
- [API Documentation with Swagger](#-api-documentation-with-swagger)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Authors](#-authors)
- [License](#-license)

---

## ✨ Features

- User Authentication 🔐
  - Register, log in, and log out users with JWT tokens.
- Task Management ✅
  - Create, list, retrieve by ID, update, and delete tasks for authenticated users.
  - Tasks include title, description, due date, and status (pending, in-progress, completed).
- Secure Routes 🛡️
  - All task and logout endpoints are protected with JWT authentication.
- Input Validation 📝
  - Validates email, password, and task title.
- Swagger Documentation 📚
  - Interactive API documentation available.
- Automated Tests 🧪
  - Comprehensive tests for authentication and task operations.

---

## 🛠 Technologies

- Node.js & Express: Backend framework.
- MongoDB & Mongoose: Database and ORM.
- JWT: Authentication with JSON Web Tokens.
- express-validator: Input validation.
- Swagger: API documentation.
- Jest & Supertest: Automated testing.
- MongoDB Memory Server: In-memory database for testing.
- Bcrypt: Password hashing.
- dotenv: Environment variable management.

---

## 🚀 Installation

1. Clone the repository:
   git clone https://github.com/exejob987/tasks-manager-backend.git
   cd tasks-manager-backend

2. Navigate to the backend directory.
3. Install the required dependencies using npm.
   - Recommended Node.js versions: 18.x or 20.x (LTS versions).
   - npm install.
4. Set up a MongoDB instance (local or cloud-based).

---

## ⚙️ Configuration

1. Create an environment file in the backend directory.
2. Define necessary environment variables such as port, MongoDB URI, and JWT secret.
3. Verify the MongoDB connection.

---

## ▶️ Running the Server

1. Start the server in production mode from the backend directory:
   - Command: `npm start`
2. Start in development mode for automatic restarts:
   - Command: `npm run dev`
3. Access the API and Swagger UI via the local server address:
   - Base URL: http://localhost:3000
   - Swagger UI: http://localhost:3000/api-docs

---

## 📚 API Documentation with Swagger

Explore and test the API using the integrated Swagger UI at http://localhost:3000/api-docs.

### Endpoints

- Auth:
  - POST /api/auth/register: Register a new user.
  - POST /api/auth/login: Log in and get a JWT token.
  - POST /api/auth/logout: Log out the authenticated user.
- Tasks (JWT-protected):
  - POST /api/tasks: Create a task.
  - GET /api/tasks: List user tasks.
  - GET /api/tasks/{id}: Retrieve a task by ID.
  - PUT /api/tasks/{id}: Update a task.
  - DELETE /api/tasks/{id}: Delete a task.

---

## 🧪 Testing

### Automated Tests

1. Run tests from the backend directory:
   - Command: `npm test`
2. Review test coverage reports generated during the process.
3. Update tests as needed to cover new functionality.

### Manual Testing with Postman

1. Register a new user.
2. Log in to obtain a JWT token.
3. Log out to test the logout functionality.
4. Create, retrieve, update, and delete tasks using valid and invalid inputs.
5. Test access to tasks with different user credentials.

---

## ⚠️ Troubleshooting

- Swagger UI not loading:
  - Verify dependencies and check the server configuration.
  - Inspect the server console for errors.

- Endpoints missing in Swagger:
  - Ensure API routes are properly documented.

- 401 Unauthorized:
  - Confirm token is correctly provided and valid.

- MongoDB connection issues:
  - Ensure MongoDB is running and the connection string is correct.

- Port conflict:
  - Check for processes using the port and adjust if necessary.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a branch for your feature.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

---

## 👥 Authors

- Angel Exequiel Soto.

---

## 📜 License

This project is licensed under the MIT License.