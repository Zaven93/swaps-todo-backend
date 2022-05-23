const { TodoModel } = require("../models/Todo.model");
const { UserModel } = require("../models/User.model");

const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.user;

    const todo = new TodoModel({
      title,
      description,
      status,
      user: id,
    });

    await todo.save();

    return res.status(200).json({ todo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error occured" });
  }
};

const getTodos = async (req, res) => {
  try {
    const { id } = req.user;
    const todos = await TodoModel.find({ user: id });

    if (!todos.length) {
      return res.status(404).json({ message: "No todos have been found" });
    }

    return res.status(200).json({ todos });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error occured" });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.user;
    const todo = await TodoModel.findOne({ id });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo with such id doesn't exist" });
    }

    return res.status(200).json({ todo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error occured" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ updatedTodo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error occured" });
  }
};

const removeTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const removedTodo = await TodoModel.findOneAndRemove({ id });

    if (!removedTodo) {
      return res
        .status(404)
        .json({ message: "User with such id doesn't exist" });
    }

    return res.status(200).json({ removedTodo });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error occured" });
  }
};

module.exports = {
  createTodo,
  getTodoById,
  getTodos,
  updateTodo,
  removeTodo,
};
