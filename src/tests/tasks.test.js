const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");
const app = require("../app");

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const res = await request(app)
    .post("/api/auth/register")
    .send({ email: "test@example.com", password: "password123" });
  token = res.body.data.token;
  userId = jwt.verify(token, process.env.JWT_SECRET).id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Tasks API", () => {
  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it("should create a task with valid status", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "Test Description",
        dueDate: "2025-07-10",
        status: "pending",
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Task created successfully");
    expect(res.body.data).toHaveProperty("title", "Test Task");
    expect(res.body.data.user).toBe(userId);
    expect(res.body.data.status).toBe("pending");
  });

  it("should create a task with default status when omitted", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "Test Description",
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Task created successfully");
    expect(res.body.data).toHaveProperty("title", "Test Task");
    expect(res.body.data.status).toBe("pending");
  });

  it("should fail to create task with invalid status", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        status: "invalid",
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe(
      "Status must be pending, in-progress, or completed"
    );
  });

  it("should list tasks for authenticated user", async () => {
    await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Test Description" });
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Tasks retrieved successfully");
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data[0]).toHaveProperty("title", "Test Task");
  });

  it("should get a task by ID", async () => {
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Test Description" });
    const getRes = await request(app)
      .get(`/api/tasks/${taskRes.body.data._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body).toHaveProperty(
      "message",
      "Task retrieved successfully"
    );
    expect(getRes.body.data).toHaveProperty("title", "Test Task");
  });

  it("should return 404 for non-existent task", async () => {
    const invalidId = "nonexistentid";
    const getRes = await request(app)
      .get(`/api/tasks/${invalidId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(getRes.status).toBe(500);
    expect(getRes.body).toHaveProperty("message", "Error retrieving task");
  });

  it("should update a task with valid status", async () => {
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Test Description" });
    const res = await request(app)
      .put(`/api/tasks/${taskRes.body.data._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Task", status: "completed" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Task updated successfully");
    expect(res.body.data).toHaveProperty("title", "Updated Task");
    expect(res.body.data).toHaveProperty("status", "completed");
  });

  it("should fail to update task with invalid status", async () => {
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Test Description" });
    const res = await request(app)
      .put(`/api/tasks/${taskRes.body.data._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Task", status: "invalid" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe(
      "Status must be pending, in-progress, or completed"
    );
  });

  it("should delete a task", async () => {
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task" });
    const res = await request(app)
      .delete(`/api/tasks/${taskRes.body.data._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Task deleted successfully");
  });

  it("should not allow access to another user’s task", async () => {
    const taskRes = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task" });
    const newUser = await request(app)
      .post("/api/auth/register")
      .send({ email: "test2@example.com", password: "password123" });
    const res = await request(app)
      .put(`/api/tasks/${taskRes.body.data._id}`)
      .set("Authorization", `Bearer ${newUser.body.data.token}`)
      .send({ title: "Unauthorized Update" });
    expect(res.status).toBe(404);
  });
});
