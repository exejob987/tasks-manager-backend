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
- [Project Structure](#-project-structure)
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
  - Validates email, password, and task title using express-validator.
- Swagger Documentation 📚
  - Interactive API documentation at http://localhost:3000/api-docs.
- Automated Tests 🧪
  - Comprehensive tests for authentication, task operations, and logout using Jest and Supertest.

---

## 🛠 Technologies

- Node.js & Express: Backend framework.
- MongoDB & Mongoose: Database and ORM.
- JWT: Authentication with JSON Web Tokens.
- express-validator: Input validation.
- Swagger: API documentation (swagger-ui-express, swagger-jsdoc).
- Jest & Supertest: Automated testing.
- MongoDB Memory Server: In-memory database for testing.
- Bcrypt: Password hashing.
- dotenv: Environment variable management.

---

## 🚀 Installation

1. Clone the repository:
   git clone <repository-url>
   cd tasks-manager

2. Install dependencies:
   cd backend
   npm install

   Ensure package.json includes:
   "dependencies": {
   "bcryptjs": "^2.4.3",
   "cors": "^2.8.5",
   "dotenv": "^16.4.5",
   "express": "^4.21.0",
   "express-validator": "^7.2.0",
   "jsonwebtoken": "^9.0.2",
   "mongoose": "^8.7.0",
   "swagger-jsdoc": "^6.2.8",
   "swagger-ui-express": "^5.0.1"
   },
   "devDependencies": {
   "jest": "^29.7.0",
   "mongodb-memory-server": "^10.0.0",
   "nodemon": "^3.1.7",
   "supertest": "^7.0.0"
   },

3. Set up MongoDB:
   - Local MongoDB: Install and run MongoDB:
     mongod
   - MongoDB Atlas: Get a connection string from MongoDB Atlas (https://www.mongodb.com/cloud/atlas).

---

## ⚙️ Configuration

1. Create .env file:
   In the tasks-manager/backend/ directory, create a .env file:
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_secure_jwt_secret

   - PORT: Server port (default: 3000).
   - MONGO_URI: MongoDB connection string (local or Atlas).
   - JWT_SECRET: Secret key for JWT signing.

2. Verify MongoDB connection:
   mongo --eval "db.adminCommand('ping')"

---

## ▶️ Running the Server

1. Start in production mode:
   cd backend
   npm start

2. Start in development mode (with nodemon):
   cd backend
   npm run dev

   Expected output:
   MongoDB connected
   Server running on port 3000

3. Access the API:
   - Base URL: http://localhost:3000
   - Swagger UI: http://localhost:3000/api-docs

---

## 📚 API Documentation with Swagger

Explore and test the API using Swagger UI at http://localhost:3000/api-docs.

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

### Testing with Swagger

1. Open Swagger UI:

   - Navigate to http://localhost:3000/api-docs.

2. Register a user:

   - Use POST /api/auth/register:
     {
     "email": "test@example.com",
     "password": "password123"
     }
   - Response:
     {
     "message": "User registered successfully",
     "data": { "token": "<jwt-token>" }
     }
   - Copy the token.

3. Authorize protected routes:

   - Click Authorize (top-right).
   - Enter Bearer <jwt-token>.

4. Test endpoints:

   - Create task (POST /api/tasks):
     {
     "title": "Test Task",
     "description": "Task description",
     "dueDate": "2025-07-10",
     "status": "pending"
     }
     Response:
     {
     "message": "Task created successfully",
     "data": {
     "\_id": "<task-id>",
     "title": "Test Task",
     "description": "Task description",
     "dueDate": "2025-07-10T00:00:00.000Z",
     "status": "pending",
     "user": "<user-id>",
     "\_\_v": 0
     }
     }

   - List tasks (GET /api/tasks):
     Response:
     {
     "message": "Tasks retrieved successfully",
     "data": [{ ... }]
     }

   - Get task by ID (GET /api/tasks/{id}):

     - Use the \_id from a created task.
     - Response:
       {
       "message": "Task retrieved successfully",
       "data": {
       "\_id": "<task-id>",
       "title": "Test Task",
       "description": "Task description",
       "dueDate": "2025-07-10T00:00:00.000Z",
       "status": "pending",
       "user": "<user-id>",
       "\_\_v": 0
       }
       }

   - Logout (POST /api/auth/logout):

     - Response:
       {
       "message": "Logout successful"
       }

   - Update/Delete: Use the task \_id for PUT /api/tasks/{id} and DELETE /api/tasks/{id}.

5. Swagger configuration:
   - Defined in tasks-manager/backend/src/swagger/swagger.js.
   - @swagger comments in tasks-manager/backend/src/routes/auth.js and tasks-manager/backend/src/routes/tasks.js define schemas.

---

## 🧪 Testing

### Automated Tests

1. Run tests:
   cd backend
   npm test

   - This generates a coverage folder in tasks-manager/backend/ with test coverage reports (e.g., lcov-report). Do not push this folder to version control; add it to .gitignore.

2. Test coverage:

   - Uses Jest and Supertest with MongoDB Memory Server.
   - Tests cover:
     - User registration, login, and logout.
     - Task CRUD operations (create, list, get by ID, update, delete).
     - Authentication and authorization (e.g., preventing access to another user’s tasks).

3. Update tests:
   - Tests expect { message, data } responses (see tasks-manager/backend/src/tests/auth.test.js and tasks-manager/backend/src/tests/tasks.test.js).
   - Example test cases to add:
     - In tasks-manager/backend/src/tests/auth.test.js:
       it('should log out a user', async () => {
       const res = await request(app)
       .post('/api/auth/register')
       .send({ email: 'test@example.com', password: 'password123' });
       const token = res.body.data.token;
       const logoutRes = await request(app)
       .post('/api/auth/logout')
       .set('Authorization', `Bearer ${token}`);
       expect(logoutRes.status).toBe(200);
       expect(logoutRes.body).toHaveProperty('message', 'Logout successful');
       });
     - In tasks-manager/backend/src/tests/tasks.test.js:
       it('should get a task by ID', async () => {
       const taskRes = await request(app)
       .post('/api/tasks')
       .set('Authorization', `Bearer ${token}`)
       .send({ title: 'Test Task', description: 'Test Description' });
       const getRes = await request(app)
       .get(`/api/tasks/${taskRes.body.data._id}`)
       .set('Authorization', `Bearer ${token}`);
       expect(getRes.status).toBe(200);
       expect(getRes.body).toHaveProperty('message', 'Task retrieved successfully');
       expect(getRes.body.data).toHaveProperty('title', 'Test Task');
       });
       it('should return 404 for non-existent task', async () => {
       const invalidId = 'nonexistentid';
       const getRes = await request(app)
       .get(`/api/tasks/${invalidId}`)
       .set('Authorization', `Bearer ${token}`);
       expect(getRes.status).toBe(404);
       expect(getRes.body).toHaveProperty('message', 'Task not found');
       });

### Manual Testing with Postman

1. Register:

   - POST http://localhost:3000/api/auth/register
   - Body:
     {
     "email": "test@example.com",
     "password": "password123"
     }
   - Expected: { "message": "User registered successfully", "data": { "token": "<jwt>" } }

2. Login:

   - POST http://localhost:3000/api/auth/login
   - Body:
     {
     "email": "test@example.com",
     "password": "password123"
     }
   - Expected: { "message": "Login successful", "data": { "token": "<jwt>" } }

3. Logout:

   - POST http://localhost:3000/api/auth/logout
   - Headers: Authorization: Bearer <jwt-token>
   - Expected: { "message": "Logout successful" }

4. Create task:

   - POST http://localhost:3000/api/tasks
   - Headers: Authorization: Bearer <jwt-token>
   - Body:
     {
     "title": "Test Task",
     "description": "Description",
     "dueDate": "2025-07-10",
     "status": "pending"
     }
   - Expected: { "message": "Task created successfully", "data": { ... } }

5. Get task by ID:

   - GET http://localhost:3000/api/tasks/<task-id>
   - Headers: Authorization: Bearer <jwt-token>
   - Expected: { "message": "Task retrieved successfully", "data": { ... } }
   - For non-existent ID: { "message": "Task not found" }

6. Update task:

   - PUT http://localhost:3000/api/tasks/<task-id>
   - Headers: Authorization: Bearer <jwt-token>
   - Body:
     {
     "title": "Updated Task",
     "description": "Updated Description",
     "dueDate": "2025-07-11",
     "status": "in-progress"
     }
   - Expected: { "message": "Task updated successfully", "data": { ... } }

7. Delete task:

   - DELETE http://localhost:3000/api/tasks/<task-id>
   - Headers: Authorization: Bearer <jwt-token>
   - Expected: { "message": "Task deleted successfully" }

8. Register:

   - POST http://localhost:3000/api/auth/register
   - Body:
     {
     "email": "test@example.com",
     "password": "password123"
     }
   - Expected: { "message": "User registered successfully", "data": { "token": "<jwt>" } }

9. Login:

   - POST http://localhost:3000/api/auth/login
   - Body:
     {
     "email": "test@example.com",
     "password": "password123"
     }
   - Expected: { "message": "Login successful", "data": { "token": "<jwt>" } }

10. Logout:

    - POST http://localhost:3000/api/auth/logout
    - Headers: Authorization: Bearer <jwt-token>
    - Expected: { "message": "Logout successful" }

11. Create task:

    - POST http://localhost:3000/api/tasks
    - Headers: Authorization: Bearer <jwt-token>
    - Body:
      {
      "title": "Test Task",
      "description": "Description",
      "dueDate": "2025-07-10",
      "status": "pending"
      }
    - Expected: { "message": "Task created successfully", "data": { ... } }

12. Get task by ID:
    - GET http://localhost:3000/api/tasks/<task-id>
    - Headers: Authorization: Bearer <jwt-token>
    - Expected: { "message": "Task retrieved successfully", "data": { ... } }
    - For non-existent ID: { "message": "Task not found" }

---

## 📂 Project Structure

tasks-manager/
├─backend/
├── src/
│ ├── config/
│ │ └── db.js # MongoDB connection
│ ├── middleware/
│ │ └── auth.js # JWT authentication middleware
│ ├── models/
│ │ ├── Task.js # Task Mongoose schema
│ │ └── User.js # User Mongoose schema
│ ├── repositories/
│ │ ├── TaskRepository.js # Task CRUD operations
│ │ └── UserRepository.js # User CRUD operations
│ ├── routes/
│ │ ├── auth.js # Auth routes (register, login)
│ │ └── tasks.js # Task routes (CRUD)
│ ├── swagger/
│ │ └── swagger.js # Swagger configuration
│ ├── tests/
│ │ ├── auth.test.js # Auth endpoint tests
│ │ └── tasks.test.js # Task endpoint tests
│ └── app.js # Express app setup
├── .env # Environment variables
├── package.json # Dependencies and scripts
└── README.md # Project documentation

---

## ⚠️ Troubleshooting

- Swagger UI not loading:

  - Verify dependencies: npm install swagger-ui-express@5.0.1 swagger-jsdoc@6.2.8.
  - Check tasks-manager/backend/src/app.js for /api-docs route.
  - Inspect server console for errors.

- Endpoints missing in Swagger:

  - Ensure @swagger comments are in tasks-manager/backend/src/routes/\*.js.
  - Verify apis: ['./src/routes/*.js'] in tasks-manager/backend/src/swagger/swagger.js.

- 401 Unauthorized:

  - Authorize Swagger with Bearer <jwt-token> in Authorize button.
  - Check token validity (expires in 1 hour).

- MongoDB connection issues:

  - Confirm MongoDB is running: mongod.
  - Verify MONGO_URI in tasks-manager/backend/.env.

- Port conflict:
  - Check port 3000:
    lsof -i :3000
    kill -9 <PID>
  - Or change PORT in tasks-manager/backend/.env.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a branch: git checkout -b feature/your-feature.
3. Commit changes: git commit -m "Add your feature".
4. Push to the branch: git push origin feature/your-feature.
5. Open a pull request.

---

## 👥 Authors

- Angel Exequiel Soto.

---

## 📜 License

This project is licensed under the MIT License.
