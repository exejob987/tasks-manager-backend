const Task = require("../models/Task");

class TaskRepository {
  async create(taskData) {
    const task = new Task(taskData);
    return await task.save();
  }

  async findByUser(userId) {
    return await Task.find({ user: userId });
  }

  async findByIdAndUser(id, userId) {
    return await Task.findOne({ _id: id, user: userId });
  }

  async update(id, userId, taskData) {
    return await Task.findOneAndUpdate({ _id: id, user: userId }, taskData, {
      new: true,
    });
  }

  async delete(id, userId) {
    return await Task.findOneAndDelete({ _id: id, user: userId });
  }
}

module.exports = new TaskRepository();
