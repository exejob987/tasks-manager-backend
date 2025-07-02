const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth API", () => {
  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    expect(res.body.data).toHaveProperty("token");
  });

  it("should not register a user with existing email", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "password123" });
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists");
  });

  it("should log in a user", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "password123" });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body.data).toHaveProperty("token");
  });

  it("should not log in with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrongpassword" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });

  it("should log out a user and invalidate token", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "password123" });
    const token = res.body.data.token;
    const logoutRes = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${token}`);
    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body).toHaveProperty("message", "Logout successful");
    const protectedRes = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);
    expect(protectedRes.status).toBe(401);
  });
});
